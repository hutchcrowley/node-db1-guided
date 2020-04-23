const express = require('express')
const db = require('../data/config')

const router = express.Router()

router.get('/', async (req, res, next) => {
	try {
		//  raw SQL:
		//  SELECT * FROM "messages";
		const messages = await db.select('*').from('messages')
		res.json(messages)
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		//  raw SQL:
		// SELECT * FROM "message" WHERE "id" = ? LIMIT 1;
		// const message = await db.first('*').from('messages').where('id', req.params.id)
		const message = await db('messages').where('id', req.params.id).first()
		res.json(message)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		}

		// raw SQL
		//  INSERT INTO "messages"("title", "contents") VALUES (?, ?);
		const message = await db('messages').insert(payload)
		res.json(message)
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		}
		await db('messages').where('id', req.params.id).update(payload)
		const updatedMessage = await db('messages').where('id', req.params.id).first()

		res.json(updatedMessage)
	} catch (err) {
		next(err)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		// DELETE FROM "messages" WHERE "id" = ?;
		await db('messages').where('id', req.params.id).del()
		// res.status(202).json() REQUEST ACCEPTED, ACTION TAKEN, NOTHING RETURNED
		res.status(204).end()
		// indicates successful response, but nothing was returned
	} catch (err) {
		next(err)
	}
})

module.exports = router

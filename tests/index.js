const app = require('./setUpMockServer')
const request = require('supertest')
const tape = require('tape')
const testData = require('./testData')

tape('AdSlot POST', (t) => {
	t.ok(
		request(app)
			.post('/adSlotPost')
			.send(testData.workingSlot)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) return t.fail(err);
				done();
			})
	)
	t.end()
})
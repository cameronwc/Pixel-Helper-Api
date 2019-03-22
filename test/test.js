let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);
describe('api', () => {
    describe('/GET api', () => {
        it('it should GET all the latest pictures', (done) => {
            chai.request(server)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        })

        it('it should GET all pictures for a query', (done) => {
            chai.request(server)
                .get('/api?q=lake')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Array');
                    done();
                });
        })

        it('it should GET a picture for an unsplash id', (done) => {
            chai.request(server)
                .get('/api/unsplash/y8iR4t4MTF8')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
                });
        })

        // it('it should GET a picture for an Pexel id', (done) => {
        //     chai.request(server)
        //         .get('/api/pexels/805295')
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('Object');
        //             done();
        //         });
        // })

        // it('it should not GET a picture for an improper Pexel id', (done) => {
        //     chai.request(server)
        //         .get('/api/pexels/xyz')
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.include({"error": "Not Found"});
        //             done();
        //         });
        // })

        it('it should not GET a picture for an improper Unsplash id', (done) => {
            chai.request(server)
                .get('/api/unsplash/xyz')
                .end((err, res) => {
                    res.should.have.status(200);
                    Object.keys(res.body).should.include("errors");
                    done();
                });
        })
    })
})
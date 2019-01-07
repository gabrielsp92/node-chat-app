const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate corret message object',() =>{
        
        let from = 'admin';
        let text = 'random message';
        let msg = generateMessage(from, text);

        console.log(msg);    
        //expect(msg.createdAt).toBeA('number');
        expect(msg).toMatchObject({from,text});

    });
});
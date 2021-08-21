
import {helper} from '../src/server/server' 

test('it should call helper',()=>{
    const output = "This is for tester"
    expect(helper()).toEqual(output)
})
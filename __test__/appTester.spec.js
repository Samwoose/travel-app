import { numOfDaysCalculator } from "../src/client/js/daysCalculator";

describe("numOfDaysCalculator testing",()=>{
    test("It calculates number of days between two different dates", ()=>{
        expect(numOfDaysCalculator).toBeDefined();
    });
});
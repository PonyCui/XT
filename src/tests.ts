import { hitTests, touchEventTests, touchRecozinerTests } from "./implementation/libraries/touch/TouchTests"

console.log("Test start.")

hitTests()
touchEventTests()
touchRecozinerTests()

setTimeout(() => {
    console.log("All Test-cases Passed")
}, 5000)


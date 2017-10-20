import { hitTests, touchEventTests } from "./implementation/libraries/touch/TouchTests"

console.log("Test start.")

hitTests()
touchEventTests()

setTimeout(() => {
    console.log("All Test-cases Passed")
}, 5000)


let debugModeEnabled = false;

export function XTRDebugger() {
    debugModeEnabled = !debugModeEnabled;
    if (debugModeEnabled) alert("Debug Mode Enabled.");
    if (!debugModeEnabled) alert("Debug Mode Disabled.");
}

export function XTRBreakpoint(breakpointID: string, breakpointCallback?: (evalScript: string) => any) {
    if (!debugModeEnabled) { return; }
    let next = false;
    while (!next) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://" + window.location.hostname + ":8083/breakpoint/" + encodeURIComponent(breakpointID), false);
            xhr.onload = function (e: any) {
                if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText === "1") {
                    next = true;
                }
                else if (xhr.readyState === 4 && xhr.status === 200) {
                    if (breakpointCallback) {
                        const response = breakpointCallback(xhr.responseText);
                        const resXHR = new XMLHttpRequest();
                        resXHR.open("GET", "http://" + window.location.hostname + ":8083/evalresult/" + encodeURIComponent(response), false);
                        resXHR.send(null);
                    }
                }
            }
            xhr.send(null);
        } catch (error) { }
    }
}
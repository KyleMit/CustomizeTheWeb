// ==UserScript==
// @name         Restore Google Icons
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Restore new google icons to previous version
// @author       KyleMit
// @match        https://*.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let subdomain = (function(){
        let domains = window.location.host.split(".")
        let rootIndex = domains.indexOf("google")
        let sub = domains[rootIndex - 1]
        return sub
    })()

    let replaceIcons = function() {

        let newIcons = {
            "mail": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR9SURBVHgB7VZbaBxVGP7O7OzOXpM0N9JqsaZWK61W8EGhMdY0NLaGulaailBEUQoi4oO+K/gkLdUHLy+CUFsUW6VaqJYgJQrRigjBCwo1kTQYmttudnb2NjOn5z+zszuz2Szby1v7hd2ZnJn5v+///v8/O8At3Oxg04cO7rFz2eOsvSueePUNVenowo0G57xybs3OmPp778Ccmb4UCGr72OSBJybBsYGLLxYMWdHkCI8MDau4QfCSG2e+tI3Pj9m8WBTxxbqq/sMu7t/DGavcLQ/q1m2FxMEXtUBnN64XJMCau4zMB0d46a/fHSbufBVtG+yPfUM8ogYq5K4QpXWNFXvqALT+gQCuA8bZ0zBOnoCd1asc4mCL86lcDmwiOcgzNkd7MAhNYZ6bnGNo+w4eS+5nV+uGPT/H0x8eZaU/J6rxyjEN08bFnAHLMoUDyZ3cFOuLQkQkpKGb8ZVudHYhlhyB1vdYU+T586PQP/3YyRrVeFSOy1D49HKKadxGWKwFXtnc+yYlHhGf/OYtWLx7K+Jz/0OxrKoGw0Dx1wuwFhagbuiFEonWzzqbQeb9IzC+OQXRaL5rJU3Dwq4nkbItBGdnWEQ0XkgR/UbqqDOo0J2JBHKDj+NS7ya0fnsaa+Znq/ZRZmOjIEujz72E8LYHfQSFid+gf3QUdirlWXWeW15/J/LJZxDpWQvr379RFIRKOa7qtVvhDB0dHQgEAlhofwH58TF0/fIjVFTHyZoXHX34bZi79yL29LNiwYT+xXHkz53x8Dr3mloYS9sHoIjStcRiiEajMIMqLObEY+Kv7ry3tbVBURQsPTKA2XvvR+LkMbToad89ubNfo3hhXGZJolCT9/LtdyC/dwThtesQE+SaKIGqqjIuXadWI+dV70bhWkZoaWkBE3VaFg/ph15D8Yfv0frzGIKeLB1i7hsvUw1isW8nWN8OJARxJBJBKBSSrhI585BLAWiAhOgJEqHrOqyBISzc9wBin32CRCa9QjCdZrp7kBW1Dt+2XtodDocrWdPHvU+SM0eI6gtSB/F4XIrIZrMI9KyD8fLrKJ0/h8RPwg1WdkLEWHroUfDB3b6sXWKXnOIw2vLhND6kA/Ur4APVkB42xDhSRuauYSzdswXxr06AiRlOD4s9YuMmmTXVOig2NWm3eMZL7oJ5uHxT0MgNCk5B8vm8DBrovQtF4QYT54lYXNpNxCRQZlpD7grw6KgjoHE1pLUEEiGbtLVVjpMU5DZZQ/Jy61V6ltc2YWMFREbloL4oFAq+4M2Rr4TKPaS8gQAip/rSR24iImBRbLcuyWrkqxG7XKpnZVViCkKZy02kXDKqOf3vFdEUOfck6mzF9UndI40TZV0vGF0jmKbZdOa18Deh+En27oyUpWv5anDnnUQ0R+5/3yAB9PPVVrlc7mp39huRu6AJkPrpFauZzF2HbT6p6BZ/q1Rjubv7NQNXIIlwhTQDi3M7beGw+vDo+Lvf9fefKirGxrB4R4lPTeFaQCVoBrP/TSNbErnHchPPj0+lcAs3Pa4AIk31+JNyGDAAAAAASUVORK5CYII=",
            "calendar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPoSURBVHgBzZZbaBxVGMf/35mZzF6ym6xRkri9aUlronSTlkabWGp9UBCLTxXBIhQU8dmmUPBFkFIsCEJ8kb7VFxUKKqQICik2S2utzUbr2jSyNk3azfa6aZrubeb0zCQ72ZndtN2hTPuHme/MOd855zfnfOcCPGKRMyOVSvkymcx6TdOa8ZDV19d3DPcDiMfjp4XpMQuJbgiQrxljH4rPuoA45wVhvhRtfFCuK/JG+vv7t1b6sRp1e8oJXdcnhdkvKl5H/UqqqvqpqDtdzhAw/U4n2Xi17kkESZa6oOmBv6/OV5bHxJOFO4m6pTlAsmW2DYxtM2z61LURDG8vmVPQtncsLsbnJXgqfjJ9sHvLwhRw/hy8FmGDYRYB8D88FukYtQDEPByDx+LE/rUAwPUkPJf2pwWgE4s/SBVVJjwsacCIYa0W2/YmciIWGpyO7WGGT7b7qPtpGUx4zxc5fp0o4sBwjuvc7rszpqI1SNTsA9a2SDg6XuTfJQrVvRO09OcxxUjKVibnCVGy2dn5V28FqVFgDZ7I82yOY5MA2dHZQBE/0cDQHRvCG+tkavIRGhsIIZVw/EIJNcX1RDlZAYDfBZkN4O0NDWgPEQaOzvPjqYXGhpIFRPwBvLxGwapIHpM3dMt/9/e3TaCNUckExzISAfhbOW1txUTsL6fj2Rkdh/7I81MXNXt+RjM7agkwuBGDdq6ctkaAaXeGNclnc/zlfKFmA9EQM/8uM6fDjUqcTizBLGr6ixfHhblZq0JAIXS2SugSz66NKl5dK+PwmQKfztYPQITilYM9o+VvubJQ8gemUOPYXd+u4PDORmtO4yK4vknOGf41O1ECCkKhRviDivCxH0bil/+r/HQA+DsMRKfOzxHe/UHjxj7wbETCvm0ROrI7TO98m+WzeX0ZgDB8QRlSoKq9NjvPoqIHZmKicxU1VBAxl7xSwujlIo78k8Oh0/O8o0VGb1SBCzU/89ml1VUAjBd7nJ5bVil4vaOa6Wy6aNr2JnerQGPaa1UAYuRjTsf3Yn4afDNMYdXeUbRpYeYuz7pbBRzUVQUg1Od0/Gm8YK73wR0h6nxKNtd97woFH/X6aWpWw9hMEa5EZF1+KnfCbucVdehcDmuaJP7+Zj/9uCtilY6lS9jz8y3udh9gRM9bLMbLCEAJpTPLVXhC7O8dTyow9vmLWc0MyPtpRVjCbJ6j1ioxpHN93dS+lRPmCDBe2oR7nLTXxSF0cqqAemRM0b0kcWZcTicWbkTEe+GxdPAXDLt4I1qaE68kVt0rSwAQAeg9wepKgFF4L/NMsEJv5f7JrVxW3G1tdUqR2M3Ux60JPA66C4I8QZZVi88TAAAAAElFTkSuQmCC",
            "drive": "data:image/png;base64,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",
            "meet": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIlSURBVHgBjVNNaBNBFH4z2SSkSSAoQZDapohaEUEP/uCpCl6EXhQEL/7iTSQeKoi1TaUYWxErRfQgVu8eetKeasSLohCKCgYEKx5FG9MaZ3Z35vlmN1s2ibZ97GN237zve997s8PgP7ZzarJ3Sdp7hSNr6zpSXz6euzj3rzzWGtgwWTxE0Ruu1vsQETS5Io9yaz7bkRionL/0NJwfCX903b89rFBNEagTG7FgdbTKVKU4nuk/DPXnsy/bFPQ+vHtqQdQfG4Cpig0PFOiG0wMuugfdgdGSwVkBwYKsF0zCplQajnT2eIkIPsAQPKq8B84Y1GxJVSPDBCktK8jeG9+llVM279d3H4D+7s1NczFKrrwuwdGerXByZhqcRBwiiVhOXBj8yr3+bJkLJPtV2724vw82JpLAXRe47YBTFzuWW2Cgkxo9LkhRC9lsFlqtJgSsj1qApBmVBqZRmLiPkvgqGBSGpQdO8cvPpuHzz++gGfdIIqC+NZ1C8s7IC8ru606m4UTXFuANMuO/pIAH5TdgxWPwRymg+p+cobHtTaegAM9wDeX5pVqm+OEtWL+FPw/TIJVRJF+iBuSegrG2/8BYfGJwG1PWDEnOUT8QEdKj0MwnMWSI+om6Nn46wPAwgcyPVqKLi3toFmc16HduzNLKgMEH0zqX/mHnw5i2u9Bq7OZV5K6iqavZlHaOVQsT1fC+tRoBclal6iNq6FYzcs1WyGdW2v4LWUkrqN/vXhYAAAAASUVORK5CYII=",
        }

        let iconPath = newIcons[subdomain]

        if (iconPath) {
            var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = iconPath;
            document.getElementsByTagName('head')[0].appendChild(link);
        }

    }

    // start in 1s, 2s, 5s
    setTimeout(replaceIcons, 1000)
    setTimeout(replaceIcons, 2000)
    setTimeout(replaceIcons, 5000)


})();

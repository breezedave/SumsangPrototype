"use strict"

const sel = (obj) => document.querySelector(obj);
const selAll = (obj) => document.querySelectorAll(obj);
const formatsecs = (val) => {
    if(val < 0) return "00:00:00";

    const s = `00${val%60}`;
    const m = `00${parseInt((val/60)%60)}`;
    const h = `00${parseInt(val/3600)}`;

    const ss = s.substring(s.length - 2, s.length);
    const mm = m.substring(m.length - 2, m.length);
    const hh = h.substring(h.length - 2, h.length);

    return `${hh}:${mm}:${ss}`
}

window.sliderState = {
    enabled: false,
    initClientX: 0,
    initObjX: 0,
    currClientX: 0,
    areaWidth: 1,
};

window.state = {
    oven1: {
        id: 1,
        name: "Oven 1: Kitchen",
        tlh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/tlh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 1,
        },
        trh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/brh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 2,
        },
        blh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/blh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 3,
        },
        brh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/brh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 4,
        },
        grill: {
            val: 0,
            targetVal: 0,
            maxVal: 1,
            camera: "./Assets/grill.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 5,
        },
        oven: {
            val: 0,
            targetVal: 0,
            maxVal: 330,
            camera: "./Assets/oven.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            isDoorOpen: false,
            id: 6,
        },
    },
    oven2: {
        id: 2,
        name: "Oven 2: Lounge",
        tlh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/tlh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 7,
        },
        trh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/brh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 8,
        },
        blh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/blh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 9,
        },
        brh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/brh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 10,
        },
        grill: {
            val: 0,
            targetVal: 0,
            maxVal: 1,
            camera: "./Assets/grill.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 11,
        },
        oven: {
            val: 0,
            targetVal: 0,
            maxVal: 330,
            camera: "./Assets/oven.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            isDoorOpen: false,
            id: 12,
        },
    },
    oven3: {
        id: 3,
        name: "Oven 3: Bathroom",
        tlh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/tlh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 13,
        },
        trh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/brh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 14,
        },
        blh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/blh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 15,
        },
        brh: {
            val: 0,
            targetVal: 0,
            maxVal: 6,
            camera: "./Assets/brh.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 16,
        },
        grill: {
            val: 0,
            targetVal: 0,
            maxVal: 1,
            camera: "./Assets/grill.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            id: 17,
        },
        oven: {
            val: 0,
            targetVal: 0,
            maxVal: 330,
            camera: "./Assets/oven.mp4",
            alarmTimer: false,
            autoOffTimer: false,
            seconds: 0,
            timerStartedAt: 0,
            isDoorOpen: false,
            id: 18,
        },
    }
}

class Index {
    constructor() {
        this.pages = [
            {
                name: "splash",
                obj: document.querySelector(".splash"),
            },
            {
                name: "chooseOven",
                obj: document.querySelector(".chooseOven"),
            },
            {
                name: "ovenMain",
                obj: document.querySelector(".ovenMain"),
            },
            {
                name: "ovenHeater",
                obj: document.querySelector(".ovenHeater"),
            },
            {
                name: "allTimers",
                obj: document.querySelector(".allTimers"),
            },
        ]
    }

    showPage(name) {
        this.pages.forEach(page => {
            page.obj.className = page.obj.className.replace(" visible", "");
        })
        const page = this.pages.filter(page => page.name === name);

        if(page.length) {
            page[0].obj.className = page[0].obj.className.replace(" visible", "") + " visible";
        }
    }

    isVisible(name) {
        return document.querySelectorAll(`.${name}.visible`).length;
    }

    updateOvenMain() {
        sel("#ovenMainTitle").innerHTML = window.currentOven.name;
        Object.keys(window.currentOven).forEach(obj => {
            if(obj === "name" || obj === "id") return;
            sel(`.${obj}`).className = window.currentOven[obj].val? `${obj} on`: `${obj} off`;
            sel(`.${obj} .val`).innerHTML = window.currentOven[obj].val;
            if(obj === "oven") sel(`.${obj} .val`).innerHTML += "°c";
            if(obj === "grill") sel(`.${obj} .val`).innerHTML = window.currentOven[obj].val? "ON": "OFF";
        })
    }

    updateHeaterMain(oven, heater) {
        window.currHeaterName = heater;
        let heaterName;

        switch (heater) {
            case "blh":
                heaterName = "Top Right Hob";
                break;
            case "brh":
                heaterName = "Bottom Right Hob";
                break;
            case "tlh":
                heaterName = "Top Left Hob";
                break;
            case "trh":
                heaterName = "Top Right Hob";
                break;
            default:
                heaterName = heater;
        }

        sel("#ovenHeaterTitle").innerHTML = heaterName;
        sel("video").src = window.currentHeater.camera;
        sel(".heaterVal").innerHTML = window.currentHeater.val;
        if(heater === "oven") sel(".heaterVal").innerHTML += "°c";
        if(heater === "grill") sel(".heaterVal").innerHTML = window.currentHeater.val? "ON": "OFF";

        sel(".heaterTargetVal").innerHTML = window.currentHeater.targetVal;
        if(window.currHeaterName === "oven") {
            if(window.currentHeater.targetVal < 30) {
                sel(".heaterTargetVal").innerHTML = "OFF";
            } else {
                sel(".heaterTargetVal").innerHTML += "°c";
            }
        }
        if(heater === "grill") sel(".heaterTargetVal").innerHTML = window.currentHeater.targetVal? "ON": "OFF";

        sel(".startAutoOff").disabled = false;
        sel(".startAlarm").disabled = false;
        sel(".startAlarm").className = "startAlarm off";
        sel(".startAutoOff").className = "startAutoOff off";

        if(window.currentHeater.alarmTimer) {
            sel(".startAutoOff").disabled = true;
            sel(".startAlarm").disabled = true;
            sel(".startAlarm").className = "startAlarm on";
        }

        if(window.currentHeater.autoOffTimer) {
            sel(".startAutoOff").disabled = true;
            sel(".startAlarm").disabled = true;
            sel(".startAutoOff").className = "startAutoOff on";
        }

        if(heater === "oven") {
            sel(".ovenDoor").className = "ovenDoor visible";
            sel(".ovenDoor").innerHTML = window.currentHeater.isDoorOpen? "Close Oven Door": "Open Oven Door";
        } else {
            sel(".ovenDoor").className = "ovenDoor hidden";
        }
    }

    alarmTriggered(oven, heater) {
        const triggered = window.state[oven][heater];
        let heaterName;

        switch (heater) {
            case "blh":
                heaterName = "Top Right Hob";
                break;
            case "brh":
                heaterName = "Bottom Right Hob";
                break;
            case "tlh":
                heaterName = "Top Left Hob";
                break;
            case "trh":
                heaterName = "Top Right Hob";
                break;
            default:
                heaterName = heater;
        }


        sel("#popup").className = "visible";
        sel("#ovenName").innerHTML = `${oven} Alarm`;
        sel("#heaterName").innerHTML = heaterName;
        sel("#autoOff").innerHTML = triggered.autoOffTimer? `${heaterName} has turned off automatically`: "";

        if(triggered.autoOffTimer) triggered.targetVal = 0;

        if(window.currentHeater && triggered.id === window.currentHeater.id) {
            sel(".heaterTargetVal").innerHTML = window.state[oven][heater].targetVal;
            if(heater === "oven") sel(".heaterTargetVal").innerHTML += "°c";
            if(heater === "grill") sel(".heaterTargetVal").innerHTML = window.state[oven][heater].targetVal? "ON": "OFF";
        }

        if(window.currentOven && oven === window.currentOven.id) {
            self.updateOvenMain()
        }

        triggered.timerStartedAt = 0;
        triggered.alarmTimer = false;
        triggered.autoOffTimer = false;
        triggered.seconds = 0;

        if(triggered.id === window.currentHeater.id) {
            sel(".startAutoOff").disabled = false;
            sel(".startAlarm").disabled = false;
            sel(".startAlarm").className = "startAlarm off";
            sel(".startAutoOff").className = "startAutoOff off";
        }
    }

    updateTimer() {
        const self = this;

        Object.keys(window.state).forEach(i => {
            const oven = window.state[i];
            const ovenId = oven.id;

            Object.keys(oven).forEach(heater => {
                if(heater === "name") return;
                const {val, targetVal, id, seconds, timerStartedAt} = oven[heater];

                if(val > targetVal) window.state[i][heater].val -= 1;
                if(val < targetVal) window.state[i][heater].val += 1;

                const now = new Date().getTime();
                const secondsRemaining = parseInt((timerStartedAt + (seconds * 1000) - now) / 1000);

                if(timerStartedAt && !secondsRemaining) self.alarmTriggered(i, heater);

                if(window.currentHeater && id === window.currentHeater.id) {
                    sel(".time").innerHTML = formatsecs(timerStartedAt? secondsRemaining: seconds);
                    sel(".heaterVal").innerHTML = window.state[i][heater].val;
                    if(heater === "oven") sel(".heaterVal").innerHTML += "°c";
                    if(heater === "grill") sel(".heaterVal").innerHTML = window.state[i][heater].val? "ON": "OFF";
                }

                if(window.currentOven && ovenId === window.currentOven.id) {
                    self.updateOvenMain()
                }

            });
        });

        self.updateAllTimers();
        setTimeout(() => self.updateTimer(), 1000);
    }

    updateAllTimers() {
        const self = this;
        const holder = sel(".allTimers ul");

        holder.innerHTML = "";

        Object.keys(window.state).forEach(ovenName => {
            Object.keys(window.state[ovenName])
            .filter(_ => _  !== "name")
            .filter(_ => window.state[ovenName][_].timerStartedAt)
            .forEach(heaterName => {
                const heater = window.state[ovenName][heaterName];
                const {timerStartedAt, seconds} = heater;
                const now = new Date().getTime();
                const secondsRemaining = parseInt((timerStartedAt + (seconds * 1000) - now) / 1000);
                let heaterPrettyName;

                switch (heaterName) {
                    case "blh":
                        heaterPrettyName = "Top Right Hob";
                        break;
                    case "brh":
                        heaterPrettyName = "Bottom Right Hob";
                        break;
                    case "tlh":
                        heaterPrettyName = "Top Left Hob";
                        break;
                    case "trh":
                        heaterPrettyName = "Top Right Hob";
                        break;
                    default:
                        heaterPrettyName = heaterName;
                }

                const el = document.createElement("div");
                const row1 = document.createElement("div");
                const row2 = document.createElement("div");
                const label = document.createElement("span");
                const type = document.createElement("span");
                const time = document.createElement("span");
                const cancel = document.createElement("button");

                el.className="allTimersTimer";
                el.setAttribute("data-oven-name", ovenName);
                el.setAttribute("data-heater-name", heaterName);

                label.innerHTML = ovenName + " - " + heaterPrettyName;

                if(heater.alarmTimer) type.innerHTML = "Alarm";
                if(heater.autoOffTimer) type.innerHTML = "Auto Off";
                time.innerHTML = formatsecs(timerStartedAt? secondsRemaining: seconds);
                cancel.innerHTML = "Cancel";
                cancel.addEventListener("click", () => {
                    const timer = window.state[ovenName][heaterName];

                    timer.seconds = 0;
                    timer.timerStartedAt = 0;
                    timer.autoOffTimer = false;
                    timer.alarmTimer = false;

                    self.updateAllTimers();
                });

                row1.appendChild(label);
                row2.appendChild(type);
                row2.appendChild(time);
                row2.appendChild(cancel);
                el.appendChild(row1);
                el.appendChild(row2);
                holder.appendChild(el);
            });
        })
    }


    init() {
        const self = this;

        selAll(".home").forEach(_ => _.addEventListener("click", () => self.showPage("chooseOven")));

        sel("#seeTimers").addEventListener("click", () => {
            self.updateAllTimers();
            self.showPage("allTimers");
        })

        selAll("#selOven1, #selOven2, #selOven3").forEach(_ => _.addEventListener("click", (e) => {
            window.currentOven = window.state[e.currentTarget.getAttribute("data-val")];
            self.updateOvenMain();
            self.showPage("ovenMain");
        }));

        selAll(".tlh, .trh, .blh, .brh, .grill, .oven").forEach(_ => _.addEventListener("click", (e) => {
            window.currentHeater = window.currentOven[e.currentTarget.getAttribute("data-val")];
            self.updateHeaterMain(window.currentOven.name, e.currentTarget.getAttribute("data-val"));
            self.showPage("ovenHeater");

            const sliderObjW = sel(".sliderHold").getBoundingClientRect().width;

            sel(".sliderObj").style.left = window.currentHeater.targetVal / window.currentHeater.maxVal * sliderObjW;
        }));

        selAll(".addTime").forEach(_ => _.addEventListener("click", (e) => {
            const numSeconds = +e.currentTarget.getAttribute("data-val");
            const {timerStartedAt} = window.currentHeater;
            window.currentHeater.seconds += numSeconds;
            const now = new Date().getTime();
            const secondsRemaining = parseInt((timerStartedAt + (window.currentHeater.seconds * 1000) - now) / 1000);

            sel(".time").innerHTML = formatsecs(timerStartedAt? secondsRemaining: window.currentHeater.seconds);
        }));

        sel(".startAlarm").addEventListener("click", () => {
            window.currentHeater.alarmTimer = true;
            window.currentHeater.timerStartedAt = new Date().getTime();
            sel(".startAutoOff").disabled = true;
            sel(".startAlarm").disabled = true;
            sel(".startAlarm").className = "startAlarm on";
            sel(".startAutoOff").className = "startAutoOff off";
        });

        sel(".startAutoOff").addEventListener("click", () => {
            window.currentHeater.autoOffTimer = true;
            window.currentHeater.timerStartedAt = new Date().getTime();
            sel(".startAutoOff").disabled = true;
            sel(".startAlarm").disabled = true;
            sel(".startAutoOff").className = "startAutoOff on";
            sel(".startAlarm").className = "startAlarm off";
        });

        sel(".cancelTimers").addEventListener("click", () => {
            window.currentHeater.seconds = 0;
            window.currentHeater.timerStartedAt = 0;
            window.currentHeater.autoOffTimer = false;
            window.currentHeater.alarmTimer = false;
            sel(".startAutoOff").disabled = false;
            sel(".startAlarm").disabled = false;
            sel(".startAlarm").className = "startAlarm off";
            sel(".startAutoOff").className = "startAutoOff off";

        });

        sel(".sliderObj").addEventListener("mousedown", (e) => {
            window.sliderState.enabled = true;
            window.sliderState.initClientX = e.clientX;
            window.sliderState.areaWidth = sel(".sliderHold").getBoundingClientRect().width;
            window.sliderState.initObjX = parseFloat(sel(".sliderObj").style.left);
        });

        sel("html").addEventListener("mouseup", () => {
            window.sliderState.enabled = false;
        })

        sel("html").addEventListener("mousemove", (e) => {
            if(!window.sliderState.enabled) return;
            let {initClientX, currClientX, areaWidth, initObjX} = window.sliderState

            currClientX = e.clientX;

            const slide = Math.min(Math.max(currClientX - initClientX + initObjX, 0), areaWidth)

            sel(".sliderObj").style.left = `${slide}px`;

            window.currentHeater.targetVal = Math.round(slide / areaWidth * window.currentHeater.maxVal,0);

            sel(".heaterTargetVal").innerHTML = window.currentHeater.targetVal;
            if(window.currHeaterName === "oven") {
                if(window.currentHeater.targetVal < 30) {
                    sel(".heaterTargetVal").innerHTML = "OFF";
                } else {
                    sel(".heaterTargetVal").innerHTML += "°c";
                }
            }
            if(window.currHeaterName === "grill") sel(".heaterTargetVal").innerHTML = window.currentHeater.targetVal? "ON": "OFF";
        })

        sel(".ovenDoor").addEventListener("click", () => {
            window.currentHeater.isDoorOpen = !window.currentHeater.isDoorOpen;

            sel(".ovenDoor").innerHTML = window.currentHeater.isDoorOpen? "Close Oven Door": "Open Oven Door";
        });

        sel("#close").addEventListener("click", () => {
            sel("#popup").className= "hidden";
        });


        if(this.isVisible("splash")) {
            setTimeout(() => self.showPage("chooseOven"), 2000);
        }

        this.updateTimer();
    }
}

window.index = new Index();
window.index.init();

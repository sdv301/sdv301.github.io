// class Tool {
//     static randomNumber(min, max) {
//         return Math.floor(Math.random() * (max - min + 1) + min);
//     }
//     static randomColorRGB() {
//         return `rgb(${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)})`;
//     }
//     static randomColorHSL(hue, saturation, lightness) {
//         return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     }
//     static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
//         const col = `${cr},${cg},${cb}`;
//         const g = ctx.createRadialGradient(x, y, 0, x, y, r);
//         g.addColorStop(0, `rgba(${col}, ${ca * 1})`);
//         g.addColorStop(0.5, `rgba(${col}, ${ca * 0.5})`);
//         g.addColorStop(1, `rgba(${col}, ${ca * 0})`);
//         return g;
//     }
// }
// class Angle {
//     constructor(a) {
//         this.a = a;
//         this.rad = (this.a * Math.PI) / 180;
//     }
//     incDec(num) {
//         this.a += num;
//         this.rad = (this.a * Math.PI) / 180;
//     }
// }
// let canvas;
// let offCanvas;

// class Canvas {
//     constructor(bool) {
//         this.canvas = document.createElement("canvas");
//         if (bool === true) {
//             this.canvas.style.position = "relative";
//             this.canvas.style.display = "block";
//             this.canvas.style.top = 0;
//             this.canvas.style.left = 0;
//             document.body.appendChild(this.canvas);
//         }
//         this.ctx = this.canvas.getContext("2d");
//         this.width = this.canvas.width = window.innerWidth;
//         this.height = this.canvas.height = window.innerHeight;
//         this.width < 768 ? (this.heartSize = 180) : (this.heartSize = 250);
//         this.mouseX = null;
//         this.mouseY = null;
//         this.hearts = [];
//         this.offHeartNum = 1;
//         this.offHearts = [];
//         this.data = null;
//         this.texts = [
//             "Секреты, которые я хранил в своем сердце",
//             "Труднее скрыть, чем я думал.",
//            "Может быть, я просто хочу быть твоим",
//             "Я хочу быть твоим",
//             "Я хочу быть твоим",
//             "Хочу быть твоим",
//             "Хочу быть твоим",
//             "Хочу быть твоим",
//             "Хочу быть твоим",
//             "Хочу быть твоим",
//             "Хочу быть",
//             "Твоим",
//             "Хочу быть твоим"
//         ]; // Массив текстов
//         this.currentTextIndex = 0; // Индекс текущего текста
//         this.currentText = ""; // Текущий текст для эффекта печатания
//         this.textIndex = 0; // Индекс текущего символа
//         this.textDelay = 100; // Задержка между символами (в миллисекундах)
//         this.textAlpha = 1; // Прозрачность текста
//         this.isFadingOut = false; // Флаг для исчезновения текста
//         this.isTyping = false; // Флаг для печатания текста
//         this.isFinished = false; // Флаг для завершения всех текстов
//         this.isDelayed = false; // Флаг для задержки перед началом
//         this.audio = new Audio(); // Создаем аудио объект
//         this.loadAudio(); // Загружаем аудио
//     }
//     loadAudio() {
//         this.audio.src = "assets/I_Wanna_Be_Yours.mp3"; // Укажите путь к вашему файлу музыки
//         this.audio.loop = true; // Включаем зацикливание музыки
//         this.audio.volume = 0.5; // Устанавливаем громкость (от 0 до 1)
//         this.audio.play().catch((error) => {
//             console.error("Ошибка при воспроизведении аудио:", error);
//         });
//     }
//     onInit() {
//         let index = 0;
//         for (let i = 0; i < this.height; i += 12) {
//             for (let j = 0; j < this.width; j += 12) {
//                 let oI = (j + i * this.width) * 4 + 3;
//                 if (this.data[oI] > 0) {
//                     index++;
//                     const h = new Heart(canvas.ctx, j + Tool.randomNumber(-3, 3), i + Tool.randomNumber(-3, 3), Tool.randomNumber(6, 12), index);
//                     canvas.hearts.push(h);
//                 }
//             }
//         }
//     }
//     offInit() {
//         for (let i = 0; i < this.offHeartNum; i++) {
//             const s = new Heart(this.ctx, this.width / 2, this.height / 2.3, this.heartSize);
//             this.offHearts.push(s);
//         }
//         for (let i = 0; i < this.offHearts.length; i++) {
//             this.offHearts[i].offRender(i);
//         }
//         this.data = this.ctx.getImageData(0, 0, this.width, this.height).data;
//         this.onInit();
//     }
//     render() {
//         this.ctx.clearRect(0, 0, this.width, this.height);
//         for (let i = 0; i < this.hearts.length; i++) {
//             this.hearts[i].render(i);
//         }
//         if (!this.isDelayed) {
//             this.startDelay(); // Запускаем задержку
//         } else if (!this.isFinished) {
//             this.drawText(); // Рисуем текст
//             this.typeWriterEffect(); // Эффект печатания текста
//             this.fadeText(); // Анимация исчезновения текста
//         }
//     }
//     startDelay() {
//         setTimeout(() => {
//             this.isDelayed = true; // После задержки начинаем печатание
//             this.isTyping = true; // Разрешаем печатание
//         }, 19000); // Задержка 19 секунд
//     }
//     drawText() {
//         const ctx = this.ctx;
//         ctx.save();
//         ctx.font = "italic bold 24px Arial"; // Курсивный шрифт
//         ctx.fillStyle = `rgba(255, 0, 0, ${this.textAlpha})`; // Цвет текста с прозрачностью
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText(this.currentText, this.width / 2, this.height - 50); // Позиция текста
//         ctx.restore();
//     }
//     typeWriterEffect() {
//         if (!this.isFadingOut && this.isTyping && this.textIndex < this.texts[this.currentTextIndex].length) {
//             this.currentText += this.texts[this.currentTextIndex][this.textIndex];
//             this.textIndex++;
//             setTimeout(() => {}, this.textDelay); // Задержка между символами
//         } else if (!this.isFadingOut && this.textIndex >= this.texts[this.currentTextIndex].length) {
//             this.isTyping = false; // Завершаем печатание
//             setTimeout(() => {
//                 this.isFadingOut = true; // Начинаем исчезновение
//             }, 1000); // Ждем секунду перед исчезновением
//         }
//     }
//     fadeText() {
//         if (this.isFadingOut) {
//             this.textAlpha -= 0.02; // Уменьшаем прозрачность
//             if (this.textAlpha <= 0) {
//                 this.textAlpha = 0;
//                 this.isFadingOut = false; // Завершаем исчезновение
//                 if (this.currentTextIndex < this.texts.length - 1) {
//                     this.currentTextIndex++; // Переходим к следующему тексту
//                     this.currentText = ""; // Сбрасываем текущий текст
//                     this.textIndex = 0; // Сбрасываем индекс символов
//                     this.isTyping = true; // Начинаем печатание нового текста
//                     this.textAlpha = 1; // Восстанавливаем прозрачность
//                 } else {
//                     this.isFinished = true; // Все тексты завершены
//                 }
//             }
//         }
//     }
//     resize() {
//         this.offHearts = [];
//         this.hearts = [];
//         this.width = this.canvas.width = window.innerWidth;
//         this.height = this.canvas.height = window.innerHeight;
//         this.width < 768 ? (this.heartSize = 180) : (this.heartSize = 250);
//     }
// }

// class Heart {
//     constructor(ctx, x, y, r, i) {
//         this.ctx = ctx;
//         this.init(x, y, r, i);
//     }
//     init(x, y, r, i) {
//         this.x = x;
//         this.xi = x;
//         this.y = y;
//         this.yi = y;
//         this.r = r;
//         this.i = i * 0.5 + 200;
//         this.l = this.i;
//         this.c = Tool.randomColorHSL(Tool.randomNumber(-5, 5), 80, 60);
//         this.a = new Angle(Tool.randomNumber(0, 360));
//         this.v = {
//             x: Math.random(),
//             y: -Math.random(),
//         };
//         this.ga = Math.random();
//     }
//     draw() {
//         const ctx = this.ctx;
//         ctx.save();
//         ctx.globalCompositeOperation = "lighter";
//         ctx.globalAlpha = this.ga;
//         ctx.beginPath();
//         ctx.fillStyle = this.c;
//         ctx.moveTo(this.x, this.y + this.r);
//         ctx.bezierCurveTo(
//             this.x - this.r - this.r / 5,
//             this.y + this.r / 1.5,
//             this.x - this.r,
//             this.y - this.r,
//             this.x,
//             this.y - this.r / 5
//         );
//         ctx.bezierCurveTo(
//             this.x + this.r,
//             this.y - this.r,
//             this.x + this.r + this.r / 5,
//             this.y + this.r / 1.5,
//             this.x,
//             this.y + this.r
//         );
//         ctx.closePath();
//         ctx.fill();
//         ctx.restore();
//     }
//     updateParams() {
//         this.a.incDec(1);
//         Math.sin(this.a.rad) < 0 ? (this.r = -Math.sin(this.a.rad) * 20) : (this.r = Math.sin(this.a.rad) * 20);
//     }
//     updatePosition() {
//         this.l -= 1;
//         if (this.l < 0) {
//             this.v.y -= 0.01;
//             this.v.x += 0.02;
//             this.y += this.v.y;
//             this.x += this.v.x;
//         }
//     }
//     wrapPosition() {
//         if (this.x > canvas.width * 1.5) {
//             this.init(this.xi, this.yi, Tool.randomNumber(6, 12), this.i);
//         }
//     }
//     render() {
//         this.wrapPosition();
//         this.updateParams();
//         this.updatePosition();
//         this.draw();
//     }
//     offRender(i) {
//         this.draw();
//     }
// }

// (function () {
//     "use strict";
//     window.addEventListener("load", function () {
//         offCanvas = new Canvas(false);
//         canvas = new Canvas(true);
//         offCanvas.offInit();

//         function render() {
//             window.requestAnimationFrame(function () {
//                 canvas.render();
//                 render();
//             });
//         }
//         render();

//         window.addEventListener(
//             "resize",
//             function () {
//                 canvas.resize();
//                 offCanvas.resize();
//                 offCanvas.offInit();
//             },
//             false
//         );

//         // Добавляем возможность менять задержку текста через консоль
//         window.changeTextDelay = function (newDelay) {
//             canvas.textDelay = newDelay;
//         };

//         // Добавляем возможность добавлять новые тексты через консоль
//         window.addText = function (newText) {
//             canvas.texts.push(newText);
//         };

//         // Добавляем возможность изменять громкость музыки через консоль
//         window.changeVolume = function (volume) {
//             canvas.audio.volume = volume;
//         };

//         // Добавляем возможность остановить или возобновить музыку через консоль
//         window.toggleMusic = function () {
//             if (canvas.audio.paused) {
//                 canvas.audio.play();
//             } else {
//                 canvas.audio.pause();
//             }
//         };
//     });
// })();




class Tool {
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static randomColorRGB() {
        return `rgb(${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)})`;
    }
    static randomColorHSL(hue, saturation, lightness) {
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
        const col = `${cr},${cg},${cb}`;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${col}, ${ca * 1})`);
        g.addColorStop(0.5, `rgba(${col}, ${ca * 0.5})`);
        g.addColorStop(1, `rgba(${col}, ${ca * 0})`);
        return g;
    }
}

class Angle {
    constructor(a) {
        this.a = a;
        this.rad = (this.a * Math.PI) / 180;
    }
    incDec(num) {
        this.a += num;
        this.rad = (this.a * Math.PI) / 180;
    }
}

let canvas;
let offCanvas;

class Canvas {
    constructor(bool) {
        this.canvas = document.createElement("canvas");
        if (bool === true) {
            this.canvas.style.position = "relative";
            this.canvas.style.display = "block";
            this.canvas.style.top = 0;
            this.canvas.style.left = 0;
            document.body.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.width < 768 ? (this.heartSize = 180) : (this.heartSize = 250);

        this.mouseX = null;
        this.mouseY = null;
        this.hearts = [];
        this.offHeartNum = 1;
        this.offHearts = [];
        this.data = null;

        // Тексты для отображения
        this.texts = [
            "Труднее скрыть, чем я думал.",
            "Может быть, я просто хочу быть твоим",
            "Я хочу быть твоим",
            "Я хочу быть твоим",
            "Хочу быть твоим",
            "Хочу быть твоим",
            "Хочу быть твоим",
            "Хочу быть твоим",
            "Хочу быть твоим",
            "Хочу быть Твоим",
            "Хочу быть твоим"
        ];

        // Временные метки для каждого текста (в миллисекундах)
        this.textTimings = [
            { startTime: 1700, endTime: 4900, text: "Секреты, которые я хранил в своем сердце" },
            { startTime: 5000, endTime: 8000, text: "Труднее скрыть, чем я думал." },
            { startTime: 9000, endTime: 12000, text: "Может быть, я просто хочу быть твоим" },
            { startTime: 12000, endTime: 13000, text: "Я хочу быть твоим" },
            { startTime: 14000, endTime: 17000, text: "Я хочу быть твоим" },
            { startTime: 17000, endTime: 21000, text: "Хочу быть твоим" },
            { startTime: 21000, endTime: 24000, text: "Хочу быть твоим" },
            { startTime: 24000, endTime: 27500, text: "Хочу быть твоим" },
            { startTime: 28000, endTime: 31000, text: "Хочу быть твоим" },
            { startTime: 31000, endTime: 35000, text: "Хочу быть твоим" },
            { startTime: 35000, endTime: 38000, text: "Хочу быть твоим" },
            { startTime: 39000, endTime: 43000, text: "Хочу быть твоим" }
        ];

        this.currentTextIndex = 0; // Индекс текущего текста
        this.currentText = ""; // Текущий текст для эффекта печатания
        this.textIndex = 0; // Индекс текущего символа
        this.textDelay = 100; // Задержка между символами (в миллисекундах)
        this.textAlpha = 1; // Прозрачность текста
        this.isFadingOut = false; // Флаг для исчезновения текста
        this.isTyping = false; // Флаг для печатания текста
        this.isFinished = false; // Флаг для завершения всех текстов

        this.audio = new Audio(); // Создаем аудио объект
        this.loadAudio(); // Загружаем аудио
    }

    loadAudio() {
        this.audio.src = "assets/I_Wanna_Be_Yours.mp3"; // Укажите путь к вашему файлу музыки
        this.audio.loop = true; // Включаем зацикливание музыки
        this.audio.volume = 0.2; // Устанавливаем громкость (от 0 до 1)
        this.audio.play().catch((error) => {
            console.error("Ошибка при воспроизведении аудио:", error);
        });
    }

    onInit() {
        let index = 0;
        for (let i = 0; i < this.height; i += 12) {
            for (let j = 0; j < this.width; j += 12) {
                let oI = (j + i * this.width) * 4 + 3;
                if (this.data[oI] > 0) {
                    index++;
                    const h = new Heart(canvas.ctx, j + Tool.randomNumber(-3, 3), i + Tool.randomNumber(-3, 3), Tool.randomNumber(6, 12), index);
                    canvas.hearts.push(h);
                }
            }
        }
    }

    offInit() {
        for (let i = 0; i < this.offHeartNum; i++) {
            const s = new Heart(this.ctx, this.width / 2, this.height / 2.3, this.heartSize);
            this.offHearts.push(s);
        }
        for (let i = 0; i < this.offHearts.length; i++) {
            this.offHearts[i].offRender(i);
        }
        this.data = this.ctx.getImageData(0, 0, this.width, this.height).data;
        this.onInit();
    }

    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    
        // Рендеринг сердец
        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].render(i);
        }
    
        // Обновление текста на основе времени воспроизведения музыки
        const currentTime = this.audio.currentTime * 1000; // Текущее время в миллисекундах
    
        // Проверяем каждый текст
        for (let i = 0; i < this.textTimings.length; i++) {
            const timing = this.textTimings[i];
    
            // Если текущее время находится в диапазоне [startTime, endTime]
            if (currentTime >= timing.startTime && currentTime < timing.endTime) {
                this.drawText(timing.text); // Отображаем соответствующий текст
                break; // Прерываем цикл, так как показывается только один текст одновременно
            }
        }
    }

    updateTextBasedOnMusic() {
        const currentTime = this.audio.currentTime * 1000; // Текущее время в миллисекундах
    
        // Проверяем каждую временную метку
        for (let i = 0; i < this.textTimings.length; i++) {
            const timing = this.textTimings[i];
    
            // Если текущее время совпадает с временной меткой
            if (currentTime >= timing.time && !timing.displayed) {
                timing.displayed = true; // Отметка о том, что этот текст уже был показан
                this.currentText = timing.text; // Устанавливаем текущий текст
                this.isTyping = true; // Начинаем печатание
                this.textIndex = 0; // Сбрасываем индекс символов
                this.textAlpha = 1; // Восстанавливаем прозрачность
            }
        }
    }

    drawText(text) {
        const ctx = this.ctx;
        ctx.save();
    
        // Определяем прозрачность текста в зависимости от времени
        const currentTime = this.audio.currentTime * 1000; // Текущее время в миллисекундах
        const timing = this.textTimings.find(t => t.text === text); // Находим соответствующий текст
    
        if (timing) {
            const duration = timing.endTime - timing.startTime; // Длительность текста
            const progress = (currentTime - timing.startTime) / duration; // Прогресс от 0 до 1
    
            let alpha = 1; // По умолчанию текст полностью видимый
    
            // Плавное появление в начале
            if (progress < 0.1) {
                alpha = Math.min(1, progress * 10); // Увеличиваем прозрачность линейно за первые 10% времени
            }
    
            // Рисуем текст
            ctx.font = "italic bold 24px Arial"; // Курсивный шрифт
            ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`; // Цвет текста с прозрачностью
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, this.width / 2, this.height - 50); // Позиция текста
        }
    
        ctx.restore();
    }

    typeWriterEffect() {
        if (!this.isFadingOut && this.isTyping && this.textIndex < this.currentText.length) {
            this.currentText = this.currentText.substring(0, this.textIndex + 1); // Добавляем следующий символ
            this.textIndex++;
            setTimeout(() => {}, this.textDelay); // Задержка между символами
        } else if (!this.isFadingOut && this.textIndex >= this.currentText.length) {
            this.isTyping = false; // Завершаем печатание
            setTimeout(() => {
                this.isFadingOut = true; // Начинаем исчезновение
            }, 1000); // Ждем секунду перед исчезновением
        }
    }

    fadeText() {
        if (this.isFadingOut) {
            this.textAlpha -= 0.005; // Медленно уменьшаем прозрачность
            if (this.textAlpha <= 0) {
                this.textAlpha = 0; // Ограничиваем минимальное значение прозрачности
                setTimeout(() => { // Добавляем небольшую задержку перед следующим текстом
                    this.isFadingOut = false; // Завершаем исчезновение
                    if (this.currentTextIndex < this.texts.length - 1) {
                        this.currentTextIndex++; // Переходим к следующему тексту
                        this.currentText = ""; // Сбрасываем текущий текст
                        this.textIndex = 0; // Сбрасываем индекс символов
                        this.isTyping = true; // Начинаем печатание нового текста
                        this.textAlpha = 1; // Восстанавливаем прозрачность
                    } else {
                        this.isFinished = true; // Все тексты завершены
                    }
                }, 500); // Задержка в 500 миллисекунд
            }
        }
    }

    resize() {
        this.offHearts = [];
        this.hearts = [];
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.width < 768 ? (this.heartSize = 180) : (this.heartSize = 250);
    }
}

class Heart {
    constructor(ctx, x, y, r, i) {
        this.ctx = ctx;
        this.init(x, y, r, i);
    }

    init(x, y, r, i) {
        this.x = x;
        this.xi = x;
        this.y = y;
        this.yi = y;
        this.r = r;
        this.i = i * 0.5 + 200;
        this.l = this.i;
        this.c = Tool.randomColorHSL(Tool.randomNumber(-5, 5), 80, 60);
        this.a = new Angle(Tool.randomNumber(0, 360));
        this.v = {
            x: Math.random(),
            y: -Math.random(),
        };
        this.ga = Math.random();
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = this.ga;
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.moveTo(this.x, this.y + this.r);
        ctx.bezierCurveTo(
            this.x - this.r - this.r / 5,
            this.y + this.r / 1.5,
            this.x - this.r,
            this.y - this.r,
            this.x,
            this.y - this.r / 5
        );
        ctx.bezierCurveTo(
            this.x + this.r,
            this.y - this.r,
            this.x + this.r + this.r / 5,
            this.y + this.r / 1.5,
            this.x,
            this.y + this.r
        );
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    updateParams() {
        this.a.incDec(1);
        Math.sin(this.a.rad) < 0 ? (this.r = -Math.sin(this.a.rad) * 20) : (this.r = Math.sin(this.a.rad) * 20);
    }

    updatePosition() {
        this.l -= 1;
        if (this.l < 0) {
            this.v.y -= 0.01;
            this.v.x += 0.02;
            this.y += this.v.y;
            this.x += this.v.x;
        }
    }

    wrapPosition() {
        if (this.x > canvas.width * 1.5) {
            this.init(this.xi, this.yi, Tool.randomNumber(6, 12), this.i);
        }
    }

    render() {
        this.wrapPosition();
        this.updateParams();
        this.updatePosition();
        this.draw();
    }

    offRender(i) {
        this.draw();
    }
}

(function () {
    "use strict";
    window.addEventListener("load", function () {
        offCanvas = new Canvas(false);
        canvas = new Canvas(true);
        offCanvas.offInit();

        function render() {
            window.requestAnimationFrame(function () {
                canvas.render();
                render();
            });
        }
        render();

        window.addEventListener(
            "resize",
            function () {
                canvas.resize();
                offCanvas.resize();
                offCanvas.offInit();
            },
            false
        );

        // Добавляем возможность менять задержку текста через консоль
        window.changeTextDelay = function (newDelay) {
            canvas.textDelay = newDelay;
        };

        // Добавляем возможность добавлять новые тексты через консоль
        window.addText = function (newText) {
            canvas.texts.push(newText);
        };

        // Добавляем возможность изменять громкость музыки через консоль
        window.changeVolume = function (volume) {
            canvas.audio.volume = volume;
        };

        // Добавляем возможность остановить или возобновить музыку через консоль
        window.toggleMusic = function () {
            if (canvas.audio.paused) {
                canvas.audio.play();
            } else {
                canvas.audio.pause();
            }
        };
    });
})();
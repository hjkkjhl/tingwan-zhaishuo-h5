Mugeda.script.push(function (mugeda) {
(function(mugeda){
mugeda.addEventListener('renderready', function () {
    var scene = mugeda.scene;
    var objects = {};
    ['Start', 'Title', 'Cloud', 'CloudSmall', 'Wisteria', 'Taotao', 'Ear', 'Eye', 'Blink'].forEach(function (name) {
        objects[name] = scene.getObjectByName('S1' + name);
    });
    var frontispiece = {};
    ['Taotao', 'Hand', 'Elephant', 'Motorcycle', 'BackWheel', 'FrontWheel'].forEach(function (name) {
        frontispiece[name] = scene.getObjectByName('S2' + name);
    });

    var openingTime = performance.now();
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var currentClick = null;
    var moving = false;
    var queuedPage;
    var audio;
    var muted = false;
    var playedOpening = false;
    var soundButton;
    var lastPage = -1;
    var nextAmbientAt = 0;
    var waveStarted = null;
    var lastBell = -Infinity;
    var audioBus;
    var pageLabel;
    var progressFill;
    var previousArrow;
    var nextArrow;
    var directory;
    var directoryMarkers = [];
    var bookPages = [{"page":3,"id":"S3","source":"前环衬.psd","title":"前环衬（前环衬.jpg）","layers":7,"art_y":367,"name":"前环衬","lines":[],"spots":[[0.22,0.45,"河马太太"],[0.47,0.48,"淘淘"],[0.76,0.45,"鹿爷爷"]]},{"page":4,"id":"P1","source":"1.psd","title":"（1.jpg）　开场：小镇上的包裹","layers":6,"art_y":72,"name":"开场：小镇上的包裹","lines":[{"speaker":"旁白","text":"白象叔叔经常给快乐小镇的居民们送快递，只要是他派送的快递，大家都很放心。"}],"spots":[[0.7,0.43,"包裹"]]},{"page":5,"id":"P2","source":"2.psd","title":"（2.jpg）　淘淘来帮忙","layers":4,"art_y":72,"name":"淘淘来帮忙","lines":[{"speaker":"旁白","text":"一天下午，白象叔叔急得团团转。"},{"speaker":"淘淘","text":"白象叔叔，你怎么了？"},{"speaker":"旁白","text":"淘淘跑过来问道。"},{"speaker":"白象叔叔","text":"唉，我的车坏了，一时修不好，还差这个包裹没送呢！"}],"spots":[[0.19,0.41,"淘淘"],[0.78,0.37,"白象叔叔"]]},{"page":6,"id":"P3","source":"3.psd","title":"（3.jpg）　没听完就跑","layers":6,"art_y":72,"name":"没听完就跑","lines":[{"speaker":"淘淘","text":"白象叔叔，让我来帮你吧！"},{"speaker":"白象叔叔","text":"真是太好了，包裹里装着曲奇饼干，那就请你这个小邮差帮忙送到……"},{"speaker":"淘淘","text":"好的！我知道啦！"},{"speaker":"旁白","text":"还没听完白象叔叔的话，淘淘已经飞快地离开了。"}],"spots":[[0.3,0.39,"淘淘"],[0.79,0.25,"白象叔叔"],[0.3,0.25,"包裹"]]},{"page":7,"id":"P4","source":"4.psd","title":"（4.jpg）　林间赶路","layers":5,"art_y":72,"name":"林间赶路","lines":[{"speaker":"淘淘","text":"河马太太平时喜欢研究饼干，肯定是送到她家！"},{"speaker":"旁白","text":"于是，他往河马太太家的方向跑去。"}],"spots":[[0.72,0.55,"花朵"]]},{"page":8,"id":"P5","source":"5.psd","title":"（5.jpg）　到了河马阿姨家","layers":2,"art_y":72,"name":"到了河马阿姨家","lines":[{"speaker":"淘淘","text":"河马太太你好，这是你的曲奇饼干！"},{"speaker":"河马太太","text":"我最近牙疼，谁会给我寄饼干呢？"},{"speaker":"旁白","text":"河马太太仔细一看，说："},{"speaker":"河马太太","text":"这不是我的，上面写着熊小姐收呢！"}],"spots":[[0.31,0.36,"河马太太"],[0.7,0.51,"花盆"]]},{"page":9,"id":"P6","source":"6.psd","title":"（6.jpg）　第一次打断","layers":3,"art_y":72,"name":"第一次打断","lines":[{"speaker":"淘淘","text":"这样啊，那你知道熊小姐的家在哪儿吗？"},{"speaker":"旁白","text":"淘淘不好意思地问。"},{"speaker":"河马太太","text":"沿着这条路走到尽头，你会看到一棵柳树……"},{"speaker":"淘淘","text":"我知道！我以前经常路过那里。"},{"speaker":"旁白","text":"淘淘突然打断说。"},{"speaker":"河马太太","text":"那就更好了，你一直走到柳树下，然后……"},{"speaker":"旁白","text":"淘淘觉得河马太太有些啰嗦，没等她说完就离开了。"}],"spots":[[0.19,0.53,"河马太太"],[0.89,0.51,"红信箱"]]},{"page":10,"id":"P7","source":"7.psd","title":"（7.jpg）　遇见鹿爷爷","layers":5,"art_y":72,"name":"遇见鹿爷爷","lines":[{"speaker":"旁白","text":"淘淘来到柳树下，发现这里多了一条新路。"},{"speaker":"淘淘","text":"啊！到底该往哪里走呢？要是我刚才仔细听就好了。"},{"speaker":"旁白","text":"他在岔路口张望着。不远处，鹿爷爷正在散步。"}],"spots":[[0.53,0.31,"鹿爷爷"]]},{"page":11,"id":"P8","source":"8.psd","title":"（8.jpg）　鹿爷爷问话","layers":9,"art_y":72,"name":"鹿爷爷问话","lines":[{"speaker":"旁白","text":"淘淘立马走上前询问，"},{"speaker":"淘淘","text":"鹿爷爷，我要去熊小姐的家，你知道怎么走吗？"}],"spots":[[0.4,0.43,"淘淘"],[0.73,0.34,"鹿爷爷"]]},{"page":12,"id":"P9","source":"9.psd","title":"（9.jpg）　第二次打断","layers":7,"art_y":72,"name":"第二次打断","lines":[{"speaker":"鹿爷爷","text":"你沿着这条石头路往前走，一直走到草莓园……"},{"speaker":"旁白","text":"鹿爷爷慢悠悠地说着。"},{"speaker":"淘淘","text":"我知道了，谢谢！"},{"speaker":"旁白","text":"淘淘一溜烟跑开了。"},{"speaker":"鹿爷爷","text":"唉……我还……没说完呢！"}],"spots":[[0.24,0.48,"鹿爷爷"],[0.78,0.26,"淘淘"]]},{"page":13,"id":"P10","source":"10.psd","title":"（10.jpg）　迷路的淘淘","layers":4,"art_y":72,"name":"迷路的淘淘","lines":[{"speaker":"旁白","text":"过了一会儿，他来到草莓园，发现四周一座房子也没有。"},{"speaker":"淘淘","text":"这该怎么办，要是我听完鹿爷爷的话就好了……"}],"spots":[[0.33,0.47,"草莓"],[0.8,0.42,"淘淘"]]},{"page":14,"id":"P11","source":"11.psd","title":"（11.jpg）　听见声音","layers":6,"art_y":72,"name":"听见声音","lines":[{"speaker":"旁白","text":"这时，他听见了一阵叽叽喳喳的叫声，他朝着叫声的方向望去。"}],"spots":[[0.75,0.15,"远处的声音"],[0.54,0.38,"淘淘"]]},{"page":15,"id":"P12","source":"12.psd","title":"（12.jpg）　鸡奶奶和小鸡们","layers":9,"art_y":72,"name":"鸡奶奶和小鸡们","lines":[{"speaker":"旁白","text":"原来是鸡妈妈带着小鸡们摘草莓。"},{"speaker":"淘淘","text":"鸡妈妈，我要去熊小姐的家，你知道怎么走吗？"},{"speaker":"旁白","text":"淘淘赶忙问道。"}],"spots":[[0.18,0.34,"小鸡"],[0.41,0.27,"鸡妈妈"],[0.56,0.37,"小鸡"],[0.81,0.23,"小鸡"]]},{"page":16,"id":"P13","source":"13.psd","title":"（13.jpg）　先听完","layers":6,"art_y":72,"name":"先听完","lines":[{"speaker":"旁白","text":"周围实在太吵了，鸡妈妈拍着翅膀，示意小鸡们安静下来。"}],"spots":[[0.61,0.35,"鸡妈妈"],[0.22,0.45,"小鸡"]]},{"page":17,"id":"P14","source":"14.psd","title":"（14.jpg）　点题：听完再说","layers":10,"art_y":72,"name":"点题：听完再说","lines":[{"speaker":"旁白","text":"鸡妈妈的喉咙发炎了，她低声说道："},{"speaker":"鸡妈妈","text":"你一直往前走，走过木桥，"},{"speaker":"鸡妈妈","text":"大风车旁边就是熊小姐的家了。"}],"spots":[[0.53,0.3,"鸡妈妈"],[0.76,0.39,"淘淘"]]},{"page":18,"id":"P15","source":"15.psd","title":"（15.jpg）　淘淘的转变","layers":7,"art_y":72,"name":"淘淘的转变","lines":[{"speaker":"旁白","text":"不过，鸡妈妈的声音实在是太小了。"},{"speaker":"旁白","text":"淘淘担心听错，他试着重复了一遍："},{"speaker":"淘淘","text":"我一直往前走，走过木桥，大风车旁边就是她家了，对吧？"},{"speaker":"旁白","text":"鸡妈妈仔细听着，脸上露出了微笑。"}],"spots":[[0.29,0.44,"淘淘"],[0.68,0.39,"鸡妈妈"]]},{"page":19,"id":"P16","source":"16.psd","title":"（16.jpg）　重新上路","layers":2,"art_y":72,"name":"重新上路","lines":[{"speaker":"旁白","text":"淘淘和大家挥手告别后，按照鸡妈妈的话，终于找到了熊小姐的家。"}],"spots":[[0.43,0.22,"风车"],[0.29,0.54,"河面"]]},{"page":20,"id":"P17","source":"17.psd","title":"（17.jpg）　学以致用","layers":4,"art_y":72,"name":"学以致用","lines":[{"speaker":"旁白","text":"熊小姐接过包裹，高兴地说："},{"speaker":"熊小姐","text":"谢谢你！我有一件事情想要拜托你。"},{"speaker":"熊小姐","text":"你能帮我把蘑菇送到小兔家吗？你往前一直走，"},{"speaker":"熊小姐","text":"绕过小竹林，沿着鹅卵石路走到尽头……"},{"speaker":"旁白","text":"淘淘认真地听着。"}],"spots":[[0.73,0.38,"熊小姐"],[0.2,0.47,"淘淘"]]},{"page":21,"id":"P18","source":"18.psd","title":"（18.jpg）　甜滋滋的结尾","layers":7,"art_y":72,"name":"甜滋滋的结尾","lines":[{"speaker":"淘淘","text":"再见！"},{"speaker":"旁白","text":"淘淘开心地出发了，这次，他一定能顺利地把蘑菇送到小兔家。"}],"spots":[[0.59,0.42,"蘑菇篮"],[0.48,0.3,"淘淘"]]},{"page":22,"id":"S23","source":"后环衬.psd","title":"后环衬（后环衬.jpg）","layers":6,"art_y":367,"name":"后环衬","lines":[],"spots":[[0.24,0.45,"鸡妈妈"],[0.52,0.5,"淘淘"],[0.74,0.45,"熊小姐"]]},{"page":23,"id":"S24","source":"封底.psd","title":"封底（封底.jpg）","layers":3,"art_y":235,"name":"封底","lines":[],"spots":[]},{"page":24,"id":"S25","source":"角色介绍.psd","title":"角色介绍（角色介绍.jpg）","layers":2,"art_y":235,"name":"角色介绍","lines":[],"spots":[[0.22,0.48,"淘淘"]]}];
    var bookNames = ['封面', '扉页'].concat(bookPages.map(function (p) { return p.name; }));
    var seenPages = [];
    var gesture;
    var wavingArm;
    var armTexture;
    var pawTexture;

    if (scene.currentPageIndex === 0) scene.pause();
    if (objects.Blink) {
        objects.Blink.top = 519;
        objects.Blink.visible = false;
    }

    function getAudio() {
        var Audio = window.AudioContext || window.webkitAudioContext;
        if (!audio && Audio) {
            audio = new Audio();
            audioBus = audio.createGain();
            audioBus.gain.value = muted ? 0 : 1;
            audioBus.connect(audio.destination);
        }
        return audio;
    }

    function playNotes(notes, volume, shape, decay) {
        var ctx = getAudio();
        if (!ctx || muted || ctx.state !== 'running') return;
        var start = ctx.currentTime;
        notes.forEach(function (entry) {
            var oscillator = ctx.createOscillator();
            var level = ctx.createGain();
            oscillator.type = shape;
            var at = start + entry[0];
            oscillator.frequency.setValueAtTime(entry[1], at);
            if (entry[2]) oscillator.frequency.exponentialRampToValueAtTime(entry[2], at + decay * 0.58);
            level.gain.setValueAtTime(0.001, at);
            level.gain.exponentialRampToValueAtTime(volume, at + 0.028);
            level.gain.exponentialRampToValueAtTime(0.001, at + decay);
            oscillator.connect(level);
            level.connect(audioBus);
            oscillator.start(at);
            oscillator.stop(at + decay + 0.02);
        });
    }

    function openingSound() {
        if (playedOpening || muted) return;
        var ctx = getAudio();
        if (!ctx || ctx.state !== 'running') return;
        playedOpening = true;
        var start = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5, 880, 1318.5, 1568].forEach(function (note, i) {
            var tone = ctx.createOscillator();
            var level = ctx.createGain();
            tone.type = 'sine';
            tone.frequency.value = note;
            var at = start + i * 0.16;
            level.gain.setValueAtTime(0.001, at);
            level.gain.exponentialRampToValueAtTime(0.13 - i * 0.012, at + 0.016);
            level.gain.exponentialRampToValueAtTime(0.001, at + 0.55);
            tone.connect(level);
            level.connect(audioBus);
            tone.start(at);
            tone.stop(at + 0.57);
        });
    }

    function pageSound() {
        var ctx = getAudio();
        if (!ctx || muted) return;
        if (ctx.state === 'suspended') ctx.resume().catch(function () {});
        var now = ctx.currentTime;
        var sample = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.28), ctx.sampleRate);
        var channel = sample.getChannelData(0);
        for (var i = 0; i < channel.length; i++) {
            var phase = i / channel.length;
            channel[i] = (Math.random() * 2 - 1) * Math.pow(Math.sin(Math.PI * phase), 1.5);
        }
        var source = ctx.createBufferSource();
        var filter = ctx.createBiquadFilter();
        var volume = ctx.createGain();
        source.buffer = sample;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2700, now);
        filter.frequency.exponentialRampToValueAtTime(620, now + 0.28);
        volume.gain.value = 0.19;
        source.connect(filter);
        filter.connect(volume);
        volume.connect(audioBus);
        source.start();
    }

    function goToPage(index, transition) {
        if (scene.currentPageIndex === index || !scene.pages[index]) return;
        if (moving) {
            queuedPage = [index, transition];
            return;
        }
        moving = true;
        pageSound();
        scene.play();
        scene.gotoPage(index, { transition: transition, exit: transition === 'fadein' ? 'fadeout' : 'none', duration: reduced ? 1 : 490 });
        window.setTimeout(function () {
            scene.gotoAndPause(scene.pages[index].startFrame);
            moving = false;
            if (queuedPage) {
                var queued = queuedPage;
                queuedPage = null;
                goToPage(queued[0], queued[1]);
            }
        }, reduced ? 35 : 520);
    }

    function goToInside() {
        goToPage(1, 'fadein');
    }

    function bounce() {
        if (scene.currentPageIndex !== 0) return;
        currentClick = performance.now();
        if (!muted) {
            var ctx = getAudio();
            if (ctx && ctx.state === 'suspended') ctx.resume().then(openingSound).catch(function () {});
            else openingSound();
        }
    }

    function motorcycleBell() {
        if (scene.currentPageIndex !== 1) return;
        var time = performance.now();
        if (time - lastBell < 220) return;
        lastBell = time;
        var ctx = getAudio();
        if (!ctx || muted) return;
        ctx.resume().then(function () {
            playNotes([[0, 1460], [0.13, 1710], [0.16, 2480]], 0.105, 'sine', 0.38);
        }).catch(function () {});
    }

    function wave() {
        if (scene.currentPageIndex !== 1) return;
        if (waveStarted !== null && performance.now() - waveStarted < 850) return;
        waveStarted = performance.now();
        var ctx = getAudio();
        if (ctx && !muted) ctx.resume().catch(function () {});
    }

    function prepareWavingArm() {
        var body = frontispiece.Taotao && frontispiece.Taotao.dom;
        var source = frontispiece.Hand && frontispiece.Hand.dom;
        if (!body || !body.parentNode || !source || !source.complete || !source.naturalWidth) return;

        var canvas = document.createElement('canvas');
        canvas.width = 146;
        canvas.height = 148;
        canvas.setAttribute('aria-hidden', 'true');
        canvas.style.cssText = 'position:absolute;left:500px;top:479px;pointer-events:none;transform:scaleX(-1);';
        body.parentNode.insertBefore(canvas, body);
        wavingArm = canvas.getContext('2d');

        armTexture = document.createElement('canvas');
        armTexture.width = 30;
        armTexture.height = 37;
        armTexture.getContext('2d').drawImage(source, 23, 0, 30, 37, 0, 0, 30, 37);

        pawTexture = document.createElement('canvas');
        pawTexture.width = 36;
        pawTexture.height = 40;
        var paw = pawTexture.getContext('2d');
        paw.beginPath();
        paw.moveTo(9, 0);
        paw.lineTo(36, 0);
        paw.lineTo(36, 40);
        paw.lineTo(3, 40);
        paw.lineTo(2, 16);
        paw.lineTo(6, 9);
        paw.closePath();
        paw.clip();
        paw.drawImage(source, 21, 28, 36, 40, 0, 0, 36, 40);
    }

    function smoothstep(value) {
        value = Math.max(0, Math.min(1, value));
        return value * value * (3 - 2 * value);
    }

    function drawWave(time, dogX, dogY) {
        if (waveStarted === null && !wavingArm) return 0;
        if (!wavingArm) prepareWavingArm();
        if (!wavingArm) return 0;
        var art = wavingArm;
        art.clearRect(0, 0, art.canvas.width, art.canvas.height);
        if (waveStarted === null) return 0;
        var elapsed = time - waveStarted;
        if (elapsed >= 1250) {
            waveStarted = null;
            return 0;
        }
        var lift = smoothstep(elapsed / 320) * (1 - smoothstep((elapsed - 850) / 400));
        var sway = reduced ? 0 : Math.sin((elapsed - 260) / 51) * smoothstep((elapsed - 240) / 130) *
            (1 - smoothstep((elapsed - 760) / 120));
        var shoulderAngle = (100 - 112 * lift - 3 * sway) * Math.PI / 180;
        var pawAngle = (110 - 151 * lift + 14 * sway) * Math.PI / 180;
        var shoulderX = 60 + dogX;
        var shoulderY = 80 + dogY - 3 * lift;
        var elbowX = shoulderX + Math.cos(shoulderAngle) * 35;
        var elbowY = shoulderY + Math.sin(shoulderAngle) * 35;

        art.save();
        art.globalAlpha = smoothstep(lift / 0.45);
        art.translate(shoulderX, shoulderY);
        art.rotate(shoulderAngle - Math.PI / 2);
        art.drawImage(armTexture, -11, -8, 22, 48);
        art.restore();
        art.save();
        art.globalAlpha = smoothstep(lift / 0.45);
        art.translate(elbowX, elbowY);
        art.rotate(pawAngle - Math.PI / 2);
        art.drawImage(pawTexture, -10, -8, 23, 41);
        art.restore();
        return 3 * lift;
    }

    function addButton(target, label, callback) {
        if (!target) return;
        target.addEventListener('click', callback);
        if (!target.dom) return;
        target.dom.setAttribute('role', 'button');
        target.dom.setAttribute('tabindex', '0');
        target.dom.setAttribute('aria-label', label);
        target.dom.style.cursor = 'pointer';
        target.dom.addEventListener('click', callback);
        target.dom.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                callback();
            }
        });
    }

    addButton(objects.Start, '开始阅读', goToInside);
    addButton(objects.Taotao, '淘淘', bounce);
    addButton(frontispiece.Taotao, '淘淘招手', wave);
    addButton(frontispiece.Elephant, '大象邮递员的摩托车铃', motorcycleBell);
    if (objects.Ear) objects.Ear.addEventListener('click', bounce);
    if (objects.Eye) objects.Eye.addEventListener('click', bounce);

    var stage = objects.Start && objects.Start.dom ? objects.Start.dom.parentElement : scene.dom;
    if (stage) {
        stage.style.touchAction = 'pan-y';
        stage.addEventListener('pointerdown', function (event) {
            gesture = { x: event.clientX, y: event.clientY, id: event.pointerId };
        }, true);
        stage.addEventListener('pointerup', function (event) {
            if (!gesture || gesture.id !== event.pointerId) return;
            var distanceX = event.clientX - gesture.x;
            var distanceY = event.clientY - gesture.y;
            gesture = null;
            if (Math.abs(distanceX) < 44 || Math.abs(distanceX) < Math.abs(distanceY) * 1.45) return;
            openBookPage(scene.currentPageIndex + (distanceX < 0 ? 1 : -1));
        }, true);
        stage.addEventListener('pointercancel', function () { gesture = null; }, true);
        stage.addEventListener('click', function (event) {
            if (event.target === soundButton) return;
            var box = stage.getBoundingClientRect();
            var x = (event.clientX - box.left) * 750 / box.width;
            var y = (event.clientY - box.top) * 1000 / box.height;
            if (scene.currentPageIndex === 0) {
                if (x >= 228 && x <= 522 && y >= 852 && y <= 938) goToInside();
                else if (x >= 100 && x <= 390 && y >= 380 && y <= 728) bounce();
            } else if (scene.currentPageIndex === 1) {
                if (x >= 528 && x <= 706 && y >= 412 && y <= 670) wave();
                else if (x >= 184 && x <= 560 && y >= 320 && y <= 659) motorcycleBell();
            }
        }, true);
    }

    function overlayButton(text, label, style, onClick) {
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = text;
        button.setAttribute('aria-label', label);
        button.style.cssText = 'position:absolute;z-index:1000;box-sizing:border-box;border:1px solid #d9b7cc;border-radius:30px;background:rgba(255,249,237,.94);color:#63365d;font:bold 24px sans-serif;line-height:1;cursor:pointer;' + style;
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            onClick();
        });
        mugeda.dom.appendChild(button);
        return button;
    }

    if (mugeda.dom) {
        soundButton = overlayButton('♪', '开启或关闭音效', 'right:25px;bottom:30px;width:60px;height:60px;font-size:33px;', function () {
            var ctx = getAudio();
            if (ctx && ctx.state === 'suspended' && !muted) {
                muted = false;
                ctx.resume().then(function () {
                    if (scene.currentPageIndex === 0) openingSound();
                }).catch(function () {});
            } else {
                muted = !muted;
            }
            if (audioBus) audioBus.gain.value = muted ? 0 : 1;
            soundButton.textContent = muted ? '×' : '♪';
            soundButton.setAttribute('aria-pressed', String(muted));
            if (muted) stopReading();
        });
        soundButton.setAttribute('aria-pressed', 'false');

        var bar = document.createElement('div');
        bar.style.cssText = 'position:absolute;z-index:1000;pointer-events:none;left:0;right:0;top:0;height:6px;background:#edd1e0;';
        progressFill = document.createElement('div');
        progressFill.style.cssText = 'height:100%;background:#a75085;transition:width .35s;';
        bar.appendChild(progressFill);
        mugeda.dom.appendChild(bar);
        pageLabel = document.createElement('div');
        pageLabel.style.cssText = 'position:absolute;z-index:1000;pointer-events:none;right:25px;top:22px;color:#704866;font:bold 20px sans-serif;';
        mugeda.dom.appendChild(pageLabel);

        previousArrow = overlayButton('‹', '返回封面', 'left:14px;top:480px;width:54px;height:59px;font-size:39px;', function () {
            openBookPage(scene.currentPageIndex - 1);
        });
        nextArrow = overlayButton('›', '下一页', 'right:14px;top:480px;width:54px;height:59px;font-size:39px;', function () {
            openBookPage(scene.currentPageIndex + 1);
        });
        directory = document.createElement('div');
        directory.hidden = true;
        directory.style.cssText = 'position:absolute;z-index:1001;bottom:101px;right:25px;min-width:250px;max-height:690px;overflow:auto;padding:12px;background:#fff9ed;border:1px solid #d9b7cc;border-radius:16px;';
        bookNames.forEach(function (name, i) {
            var item = document.createElement('button');
            item.type = 'button';
            item.textContent = name;
            item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px;border:0;background:transparent;text-align:left;color:#63365d;font:bold 24px sans-serif;cursor:pointer;';
            var marker = document.createElement('span');
            marker.setAttribute('aria-hidden', 'true');
            marker.style.cssText = 'width:10px;height:10px;margin-left:15px;border:1px solid #b66896;border-radius:50%;';
            item.appendChild(marker);
            directoryMarkers.push(marker);
            item.addEventListener('click', function (event) {
                event.stopPropagation();
                directory.hidden = true;
                openBookPage(i);
            });
            directory.appendChild(item);
        });
        bookButton(directory, '关于本书', 'width:100%;padding:10px;', showCopyright);
        mugeda.dom.appendChild(directory);
        overlayButton('目录', '目录', 'right:101px;bottom:30px;width:87px;height:60px;', function () {
            directory.hidden = !directory.hidden;
        });
    }

    var runnerStyle = document.createElement('style');
    runnerStyle.textContent = '.s2-follow-runner { transform-origin: 0 0 !important; transform: translate(var(--follow-x), var(--follow-y)) scaleX(-1) !important; }';
    document.head.appendChild(runnerStyle);

    function positionRunner(part, right, top) {
        if (!part || !part.dom) return;
        part.dom.classList.add('s2-follow-runner');
        part.dom.style.setProperty('--follow-x', right + 'px');
        part.dom.style.setProperty('--follow-y', top + 'px');
    }

    var copyrightImage = "data:image/webp;base64,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";
    var sceneCues = {
        S3:['leaves','birds'], P1:['leaves','street'], P2:['run','steps'],
        P3:['rush','fastSteps'], P4:['leaves','forest'], P5:['nod','door'],
        P6:['rush','sigh'], P7:['leaves','leaves'], P8:['nod','soft'],
        P9:['rush','steps'], P10:['shade','wonder'], P11:['halo','call'],
        P12:['chirps','chirps'], P13:['quiet','soft'], P14:['halo','piano'],
        P15:['bright','ding'], P16:['wheel','water'], P17:['ornament','bell'],
        P18:['petals','ending'], S23:['leaves','ending'], S24:['leaves','bell'],
        S25:['quiet','soft']
    };
    var soundProfiles = {
        birds:[[.05,1780,2470],[.29,2350,1870],[.9,1760,2440]],
        street:[[.05,147],[.5,220],[.71,185]],
        steps:[[0,125,66],[.2,135,70],[.4,120,62],[.6,110,59]],
        fastSteps:[[0,160,84],[.13,150,77],[.25,133,67],[.37,120,60],[.47,105,55]],
        forest:[[.05,1860,2480],[.55,128,65],[.82,125,60],[1.05,2380,1900]],
        door:[[0,132,205],[.13,183,126],[.21,229,130]],
        sigh:[[0,397,165],[.2,310,149],[.47,139,80]],
        leaves:[[0,660,480],[.22,575,360],[.39,490,310]],
        soft:[[0,392],[.45,523],[.9,587],[1.34,523]],
        wonder:[[0,349],[.35,415],[.85,554],[1.11,467]],
        call:[[0,1270,1700],[.35,1580,2010],[.66,1670,2080]],
        chirps:[[0,2160,2910],[.135,2510,3270],[.29,1875,2450]],
        piano:[[0,262],[.07,392],[.5,523],[.9,659],[1.25,523]],
        ding:[[0,1318],[.025,2637]],
        water:[[0,550,330],[.11,485,270],[.3,566,330],[.55,125,62]],
        bell:[[0,880],[.022,1320],[.15,1174],[.17,2348]],
        ending:[[0,523],[.31,659],[.62,784],[1.02,659],[1.43,587],[1.73,523]]
    };

    function sceneSound(name, ambient) {
        if (!soundProfiles[name] || muted) return;
        var ctx = getAudio();
        if (!ctx) return;
        function play() {
            var tonal = /soft|wonder|piano|ending|ding|bell/.test(name);
            playNotes(soundProfiles[name], ambient ? .025 : .065, tonal ? 'triangle' : 'sine', tonal ? .46 : .15);
        }
        if (ctx.state === 'running') play();
        else if (!ambient) ctx.resume().then(play).catch(function () {});
    }

    function effectFrames(effect) {
        switch (effect) {
        case 'nod': return [{rotate:'0deg'},{rotate:'4deg',translate:'0 6px'},{rotate:'0deg'}];
        case 'shake': return [{rotate:'0deg'},{rotate:'-3deg'},{rotate:'3deg'},{rotate:'-2deg'},{rotate:'0deg'}];
        case 'sway': return [{rotate:'0deg'},{rotate:'2deg'},{rotate:'-2deg'},{rotate:'0deg'}];
        case 'jump': return [{translate:'0 0'},{translate:'0 -18px'},{translate:'0 0'}];
        case 'tap': return [{translate:'0 0'},{translate:'0 8px'},{translate:'0 0'}];
        case 'rush': return [{translate:'0 0',scale:1},{translate:'85px -15px',scale:.9},{translate:'0 0',scale:1}];
        case 'wheel': return [{rotate:'0deg'},{rotate:'360deg'}];
        case 'wave': return [{rotate:'0deg'},{rotate:'-3deg',translate:'0 -7px'},{rotate:'3deg'},{rotate:'0deg'}];
        default: return [{translate:'0 0'},{translate:'3px -5px'},{translate:'0 0'}];
        }
    }

    function moveArtwork(image, movement, duration, delay, iterations) {
        if (!image || !image.animate || reduced) return;
        if (!image.style.transformOrigin && movement === 'wheel') image.style.transformOrigin = '50% 50%';
        return image.animate(effectFrames(movement), {duration:duration,delay:delay || 0,iterations:iterations || 1,easing:'ease-in-out'});
    }

    function spark(container, x, y, mode, delay) {
        if (reduced) return;
        var colors = {bloom:'#e89abb',glow:'#ffe7a0',dust:'#f4d8ae',petal:'#eaa6aa',wave:'#ac739e',light:'#fff0c4'};
        var color = colors[mode] || colors.glow;
        var big = mode === 'wave';
        var particle = bookElement(container, 'span', '', 'position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + (big ? 44 : 13) + 'px;height:' + (big ? 44 : 11) + 'px;border-radius:50%;opacity:0;' + (big ? 'border:3px solid '+color : 'background:'+color) + ';');
        var end = mode === 'petal' ? '29px 110px' : mode === 'dust' ? '-40px 1px' : '0 -25px';
        var duration = mode === 'petal' ? 2200 : mode === 'light' ? 1800 : 820;
        if (particle.animate) particle.animate([{opacity:0,scale:.5},{opacity:.85,offset:.35},{opacity:0,translate:end,scale:big ? 3 : 1.35}],{duration:duration,delay:delay,easing:'ease-out'});
        window.setTimeout(function () { particle.remove(); }, duration + delay);
    }

    function runSceneIntro(container, page, position, spots) {
        var profile = sceneCues[page.id];
        if (!profile) return;
        var mode = profile[0];
        var pageAudio = profile[1];
        var poses = spots.map(function (spot) { return artLayerAt(spot[0] * 750, spot[1] * 1000); });
        var running = /run|rush|chirps|wheel/.test(mode);
        var still = /quiet|shade|halo|bright|ornament|petals/.test(mode);
        poses.forEach(function (image, i) {
            if (!image || poses.indexOf(image) !== i) return;
            var target = spots[i][2];
            if (mode === 'rush' && target !== '淘淘') return;
            if (mode === 'wheel' && target !== '风车') return;
            if (still) return;
            var movement = mode === 'rush' ? 'rush' : mode === 'wheel' ? 'wheel' :
                running ? 'jump' : mode === 'nod' ? 'nod' : 'sway';
            moveArtwork(image, movement, mode === 'wheel' ? 5600 : running ? 900 : 2800, i * 145, running ? 2 : 3);
        });
        if (/shade|halo|bright|petals/.test(mode)) {
            var tint = mode === 'shade' ? 'rgba(57,36,62,.2)' : mode === 'petals' ? 'rgba(255,128,51,.14)' : 'rgba(255,224,157,.22)';
            var cover = bookElement(container,'span','','position:absolute;left:0;right:0;top:72px;height:530px;background:'+tint+';pointer-events:none;');
            if (cover.animate && !reduced) cover.animate([{opacity:0},{opacity:1}],{duration:1700,fill:'forwards',easing:'ease-out'});
        }
        if (/leaves|rush|petals|halo|wheel|ornament/.test(mode)) {
            var kind = mode === 'petals' ? 'petal' : mode === 'rush' ? 'dust' : 'light';
            for (var p = 0; p < 8; p++) spark(container, 80 + (p * 89) % 620, mode === 'petals' ? 90 + p % 4 * 70 : 300 + p % 4 * 58, kind, 150 + p * 175);
        }
        window.setTimeout(function () {
            if (scene.currentPageIndex === position && !readingActive) sceneSound(pageAudio, true);
        }, 620);
    }

    function playSceneAction(container, page, name, x, y) {
        var special = {
            S3:{'河马太太':'nod','淘淘':'nod','鹿爷爷':'nod'},
            P1:{'包裹':'shake'},P3:{'白象叔叔':'wave','包裹':'jump'},P4:{'花朵':'bloom'},
            P5:{'河马太太':'nod','花盆':'shake'},P6:{'河马太太':'shake','红信箱':'shake'},
            P7:{'鹿爷爷':'tap'},P9:{'鹿爷爷':'shake'},P10:{'草莓':'bloom','淘淘':'shake'},
            P11:{'远处的声音':'wave'},P12:{'小鸡':'jump'},P13:{'鸡妈妈':'listen'},
            P15:{'淘淘':'understood'},P16:{'风车':'wheel','河面':'ripple'},
            P18:{'蘑菇篮':'glow','淘淘':'hum'},S23:{'鸡妈妈':'wave','淘淘':'wave','熊小姐':'wave'},S25:{'淘淘':'shake'}
        };
        var effect = special[page.id] && special[page.id][name] || 'nod';
        var image = artLayerAt(x,y);
        var burst = /bloom|glow|ripple/.test(effect) || name === '远处的声音';
        if (!burst) moveArtwork(image, effect === 'understood' ? 'nod' : effect, effect === 'wheel' ? 3100 : 700);
        if (burst) for (var i = 0; i < 5; i++) spark(container,x + (i-2)*25,y + (i%2)*14,effect === 'ripple' || name === '远处的声音' ? 'wave' : effect,i*140);
        if (effect === 'listen') return {text:'👂 安静倾听',sound:'soft'};
        if (effect === 'understood') return {text:'明白了！',sound:'ding'};
        if (effect === 'hum') return {text:'♪',sound:'ending'};
        return {sound: name === '鹿爷爷' && page.id === 'P7' ? 'steps' : name === '小鸡' ? 'chirps' : name === '河面' ? 'water' : null};
    }

    var readerLayer;
    var readingVersion = 0;
    var readingActive = false;

    function openBookPage(index) {
        var target = bookPages[index - 2];
        var style = target && ['S3','P10','P11','P18','S23','S24','S25'].indexOf(target.id) >= 0 ? 'fadein' :
            target && target.id === 'P14' ? 'zoom' : 'ladder';
        goToPage(index, style);
    }

    function stopReading() {
        readingVersion++;
        readingActive = false;
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        if (readerLayer) [].forEach.call(readerLayer.querySelectorAll('[data-line]'), function (line) {
            line.style.background = '';
        });
    }

    function readLines(lines, selected, complete) {
        if (muted || !window.speechSynthesis || !window.SpeechSynthesisUtterance || !lines.length) {
            if (complete) window.setTimeout(complete, 2100);
            return;
        }
        stopReading();
        readingActive = true;
        var version = readingVersion;
        var index = 0;
        var voices = window.speechSynthesis.getVoices().filter(function (v) { return /^zh/i.test(v.lang); });
        function speakNext() {
            if (version !== readingVersion) return;
            if (index >= lines.length) {
                readingActive = false;
                if (complete) complete();
                return;
            }
            var entry = lines[index];
            var visualLine = selected && selected[index];
            var utterance = new SpeechSynthesisUtterance(entry.text);
            var speaker = entry.speaker;
            utterance.lang = 'zh-CN';
            if (voices.length) utterance.voice = voices[0];
            utterance.pitch = /淘淘/.test(speaker) ? 1.27 : /爷爷|大象/.test(speaker) ? .75 : /奶奶/.test(speaker) ? .95 : 1.05;
            utterance.rate = /爷爷|奶奶/.test(speaker) ? .8 : /淘淘/.test(speaker) ? .98 : .88;
            utterance.onstart = function () {
                if (visualLine) visualLine.style.background = '#f0dbe7';
            };
            utterance.onend = function () {
                if (visualLine) visualLine.style.background = '';
                index++;
                speakNext();
            };
            utterance.onerror = function () {
                if (version === readingVersion) readingActive = false;
                if (visualLine) visualLine.style.background = '';
                if (complete && version === readingVersion) window.setTimeout(complete, 2100);
            };
            window.speechSynthesis.speak(utterance);
        }
        speakNext();
    }

    function bookElement(parent, tag, text, css) {
        var element = document.createElement(tag);
        if (text) element.textContent = text;
        element.style.cssText = css;
        parent.appendChild(element);
        return element;
    }

    function bookButton(parent, text, css, handler) {
        var button = bookElement(parent, 'button', text, 'pointer-events:auto;cursor:pointer;border:1px solid #ddbbc9;background:#fff9ed;color:#63365d;border-radius:26px;font:bold 24px sans-serif;' + css);
        button.type = 'button';
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            handler();
        });
        return button;
    }

    function showCopyright() {
        directory.hidden = true;
        var panel = bookElement(mugeda.dom, 'section', '', 'position:absolute;inset:65px 36px;z-index:1010;display:flex;flex-direction:column;gap:16px;padding:18px;background:#fff9ed;border:1px solid #ddbbc9;border-radius:22px;');
        panel.setAttribute('role','dialog');
        panel.setAttribute('aria-label','关于本书');
        var close = bookButton(panel,'关闭','align-self:end;padding:10px 18px;',function () { panel.remove(); });
        var scroll = bookElement(panel,'div','','overflow:auto;flex:1;');
        var image = bookElement(scroll,'img','','width:100%;min-width:1080px;display:block;');
        image.src = copyrightImage;
        image.alt = '原绘本版权页';
        close.focus();
    }

    function artLayerAt(x, y) {
        if (!stage) return null;
        var origin = stage.getBoundingClientRect();
        var sx = origin.left + origin.width * x / 750;
        var sy = origin.top + origin.height * y / 1000;
        var layers = [].slice.call(stage.querySelectorAll('img[data-type="bitmap"]')).reverse();
        return layers.find(function (image) {
            if (!image.getClientRects().length || image.style.visibility === 'hidden') return false;
            var box = image.getBoundingClientRect();
            if (box.width >= origin.width * .92 && box.height >= origin.height * .50) return false;
            if (sx < box.left || sx >= box.right || sy < box.top || sy >= box.bottom) return false;
            try {
                var probe = document.createElement('canvas');
                probe.width = probe.height = 1;
                var ctx = probe.getContext('2d');
                ctx.drawImage(image, (sx - box.left) / box.width * image.naturalWidth,
                    (sy - box.top) / box.height * image.naturalHeight, 1, 1, 0, 0, 1, 1);
                return ctx.getImageData(0, 0, 1, 1).data[3] > 35;
            } catch (_) {
                return true;
            }
        });
    }

    function showBookPage(index) {
        stopReading();
        if (readerLayer) readerLayer.remove();
        readerLayer = null;
        var page = bookPages[index - 2];
        if (!page || !mugeda.dom) return;
        readerLayer = bookElement(mugeda.dom, 'section', '', 'position:absolute;inset:0;z-index:990;pointer-events:none;color:#493145;font-family:sans-serif;');
        var container = readerLayer;
        var said = false;
        var spots = page.spots;
        var captionRows = [];
        var total = page.lines.length;
        var caption = total ? bookElement(container, 'div', '', 'pointer-events:auto;position:absolute;left:58px;right:58px;top:630px;max-height:255px;box-sizing:border-box;padding:20px;background:rgba(255,252,245,.96);border:1px solid #eddfca;border-radius:22px;overflow:auto;') : null;
        if (caption) {
            var controls = bookElement(caption, 'div', '', 'display:flex;align-items:center;justify-content:space-between;gap:10px;');
            bookElement(controls, 'strong', page.name, 'font-size:26px;color:#63365d;');
            var replay = bookButton(controls, '朗读', 'padding:9px 16px;flex-shrink:0;', function () {
                readLines(page.lines, captionRows);
            });
            replay.setAttribute('aria-label', '朗读本页');
            page.lines.forEach(function (line, i) {
                var text = (line.speaker === '旁白' ? '' : line.speaker + '：') + line.text;
                var row = bookElement(caption, 'div', text, 'font-size:28px;line-height:1.6;padding:0 5px;border-radius:7px;');
                row.setAttribute('data-line', i);
                captionRows.push(row);
            });
        }

        var bubble = bookElement(container, 'div', '', 'display:none;position:absolute;transform:translate(-50%,-100%);max-width:285px;min-width:85px;box-sizing:border-box;padding:12px 17px;background:#fffaf1;border:1px solid #dcb6cb;border-radius:21px;color:#57364e;font-size:24px;line-height:1.35;text-align:center;');
        var bubbleTimer;
        spots.forEach(function (spot, s) {
            var x = Math.round(spot[0] * 750);
            var y = Math.round(spot[1] * 1000);
            var name = spot[2];
            var hot = bookButton(container, '', 'position:absolute;left:' + x + 'px;top:' + y + 'px;width:96px;height:96px;border:0;background:transparent;transform:translate(-50%,-50%);', function () {
                if (page.id === 'P17' && name === '淘淘' && !said) {
                    reveal('先听熊小姐把话说完。', x, y);
                    return;
                }
                var response = playSceneAction(container, page, name, x, y);
                var matches = page.lines.filter(function (line) { return line.speaker === name; });
                var listenGate = page.id === 'P17' && name === '熊小姐';
                if (listenGate) said = false;
                if (page.id === 'P17' && name === '淘淘') matches = [{speaker:name,text:'我听完啦，谢谢您！'}];
                if (page.id === 'P8' && name === '鹿爷爷') matches = bookPages.find(function (p) { return p.id === 'P9'; }).lines.filter(function (line) { return line.speaker === name; });
                if (response.text || matches.length) reveal(response.text || matches[0].text, x, y);
                if (response.sound) sceneSound(response.sound, false);
                else if (!matches.length) sceneSound(sceneCues[page.id][1], false);
                if (matches.length && response.text !== '♪') readLines(listenGate ? matches : matches.slice(0,1),
                    listenGate ? matches.map(function (line) { return captionRows[page.lines.indexOf(line)]; }) : null,
                    listenGate ? function () { said = true; } : null);
            });
            hot.setAttribute('aria-label', name);
        });

        function reveal(text, x, y) {
            bubble.textContent = text;
            bubble.style.display = 'block';
            bubble.style.left = Math.max(150, Math.min(600, x)) + 'px';
            bubble.style.top = Math.max(120, y - 48) + 'px';
            window.clearTimeout(bubbleTimer);
            bubbleTimer = window.setTimeout(function () { bubble.style.display = 'none'; }, 2600);
        }

        window.setTimeout(function () {
            if (readerLayer === container) runSceneIntro(container, page, index, spots);
        }, 580);
        if (page.id === 'S3') bookElement(container, 'div', '今天，淘淘要去送一件特别的东西。', 'position:absolute;top:680px;left:55px;right:55px;text-align:center;font-size:28px;');
        if (page.id === 'S23') bookElement(container, 'div', '耐心听完，朋友会更多哦。', 'position:absolute;top:680px;left:55px;right:55px;text-align:center;font-size:28px;');
        if (page.id === 'S24') {
            bookButton(container, '再读一遍', 'position:absolute;top:790px;left:165px;padding:13px 23px;', function () { openBookPage(0); });
            bookButton(container, '认识淘淘', 'position:absolute;top:790px;right:165px;padding:13px 23px;', function () { openBookPage(index + 1); });
        }
    }

    function animate(time) {
        if (scene.currentPageIndex !== lastPage) {
            lastPage = scene.currentPageIndex;
            showBookPage(lastPage);
            if (lastPage === 1) nextAmbientAt = time + 360;
            if (lastPage === 0) openingTime = time;
            if (pageLabel) {
                pageLabel.textContent = (lastPage + 1) + ' / ' + bookNames.length;
                progressFill.style.width = (lastPage + 1) / bookNames.length * 100 + '%';
                previousArrow.style.display = lastPage === 0 ? 'none' : '';
                nextArrow.style.display = lastPage < bookNames.length - 1 ? '' : 'none';
                previousArrow.setAttribute('aria-label', lastPage === 1 ? '返回封面' : '上一页');
                directory.hidden = true;
                seenPages[lastPage] = true;
                directoryMarkers.forEach(function (marker, i) {
                    marker.style.backgroundColor = seenPages[i] ? '#a75085' : 'transparent';
                });
            }
        }
        if (scene.currentPageIndex === 0) {
            var elapsed = time - openingTime;
            if (objects.Title) {
                var opacity = reduced ? 1 : Math.min(1, elapsed / 680);
                var progress = 1 - Math.pow(1 - opacity, 3);
                objects.Title.alpha = progress;
                objects.Title.top = 57 + (1 - progress) * 15;
            }
            if (!reduced) {
                if (objects.Cloud) objects.Cloud.left = 48 + Math.sin(elapsed / 2550) * 14;
                if (objects.CloudSmall) objects.CloudSmall.left = 598 + Math.sin(elapsed / 3100) * 11;
                if (objects.Wisteria) objects.Wisteria.left = Math.sin(elapsed / 810) * 2.2;
            }
            var sinceTap = currentClick === null ? Infinity : time - currentClick;
            var blink = sinceTap < 145 || (sinceTap > 280 && sinceTap < 390);
            if (objects.Eye) objects.Eye.alpha = blink ? 0 : 1;
            if (objects.Blink) {
                objects.Blink.visible = true;
                objects.Blink.top = blink ? 519 : -60;
            }
            if (objects.Ear) {
                var p = Math.min(sinceTap / 630, 1);
                var tilt = reduced || p === 1 ? 0 : Math.sin(p * Math.PI * 3) * Math.sin(p * Math.PI) * 0.13;
                objects.Ear.rotate = tilt;
                objects.Ear.left = 271 + Math.sin(tilt) * -7;
            }
        }
        if (scene.currentPageIndex === 1) {
            var dx = reduced ? 0 : Math.sin(time / 1100) * 7;
            var dy = reduced ? 0 : Math.sin(time / 850) * 3;
            var dogX = -dx * 0.64;
            var step = time / 146;
            var dogY = -dy - (reduced ? 0 : Math.abs(Math.sin(step)) * 7);
            var lift = drawWave(time, dogX, dogY);
            positionRunner(frontispiece.Taotao, 696 - dogX, 425 + dogY - lift);
            positionRunner(frontispiece.Hand, 660 - dogX, 542 + dogY - lift);
            if (frontispiece.Elephant) {
                frontispiece.Elephant.left = 302 + dx;
                frontispiece.Elephant.top = 327 + dy;
            }
            if (frontispiece.Motorcycle) {
                frontispiece.Motorcycle.left = 191 + dx;
                frontispiece.Motorcycle.top = 462 + dy;
            }
            if (frontispiece.BackWheel) {
                frontispiece.BackWheel.left = 424 + dx;
                frontispiece.BackWheel.top = 534 + dy;
                frontispiece.BackWheel.rotate = reduced ? 0 : (time / 850) % (Math.PI * 2);
            }
            if (frontispiece.FrontWheel) {
                frontispiece.FrontWheel.left = 192 + dx;
                frontispiece.FrontWheel.top = 534 + dy;
                frontispiece.FrontWheel.rotate = reduced ? 0 : (time / 850) % (Math.PI * 2);
            }
            if (time >= nextAmbientAt && audio && audio.state === 'running' && !muted) {
                nextAmbientAt = time + 5400;
                playNotes([[0, 392], [.47, 493.88], [.91, 587.33], [1.42, 659.25], [2.19, 587.33], [2.62, 493.88], [3.32, 440], [3.8, 523.25]], 0.025, 'triangle', 0.52);
                playNotes([[0.34, 1880, 2570], [0.55, 2360, 1900], [3.22, 2140, 2640]], 0.012, 'sine', 0.14);
            }
        }
        window.requestAnimationFrame(animate);
    }
    openingSound();
    window.requestAnimationFrame(animate);
});

}).call(mugeda, mugeda);

});

const sentences = [

{
    chinese:"这家韩式紫菜包饭真不赖。",
    pinyin:"Zhè jiā Hánshì zǐcài bāofàn zhēn bú lài.",
    korean:"이 한국식 김밥집 정말 괜찮다."
},

{
    chinese:"没想到在中国也能吃到这么地道的韩餐。",
    pinyin:"Méi xiǎngdào zài Zhōngguó yě néng chī dào zhème dìdao de Háncān.",
    korean:"중국에서도 이렇게 정통 한국 음식을 먹을 수 있을 줄 몰랐다."
},

{
    chinese:"今天工作特别忙。",
    pinyin:"Jīntiān gōngzuò tèbié máng.",
    korean:"오늘 일이 정말 바빴다."
}

];

const savedData =
JSON.parse(localStorage.getItem("mySentences")) || [];

sentences.push(...savedData);

let currentIndex = 0;
let pinyinVisible = true;

function renderSentence(){

    document.getElementById("sentence").innerText =
        sentences[currentIndex].chinese;

    document.getElementById("pinyin").innerText =
        pinyinVisible
        ? sentences[currentIndex].pinyin
        : "";

    document.getElementById("meaning").innerText =
        sentences[currentIndex].korean;
}

function nextSentence(){

    currentIndex++;

    if(currentIndex >= sentences.length){
        currentIndex = 0;
    }

    renderSentence();
}

function randomSentence(){

    currentIndex =
        Math.floor(Math.random() * sentences.length);

    renderSentence();
}

function togglePinyin(){

    pinyinVisible = !pinyinVisible;

    renderSentence();
}

function speakSentence(){

    const utterance =
        new SpeechSynthesisUtterance(
            sentences[currentIndex].chinese
        );

    utterance.lang = "zh-CN";

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

function addSentence(){

    const chinese =
        document.getElementById("newChinese").value.trim();

    const pinyin =
        document.getElementById("newPinyin").value.trim();

    const korean =
        document.getElementById("newKorean").value.trim();

    if(chinese === ""){

        alert("중국어 문장을 입력하세요.");
        return;
    }

    const newSentence = {
        chinese,
        pinyin,
        korean
    };

    sentences.push(newSentence);

    const customSentences =
        JSON.parse(
            localStorage.getItem("mySentences")
        ) || [];

    customSentences.push(newSentence);

    localStorage.setItem(
        "mySentences",
        JSON.stringify(customSentences)
    );

    document.getElementById("newChinese").value = "";
    document.getElementById("newPinyin").value = "";
    document.getElementById("newKorean").value = "";

    alert("저장 완료!");
}

renderSentence();

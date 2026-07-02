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
},

{
    chinese:"你吃过韩国泡菜吗？",
    pinyin:"Nǐ chīguo Hánguó pàocài ma?",
    korean:"한국 김치 먹어본 적 있어?"
}

];

let currentIndex = 0;
let pinyinVisible = true;

function renderSentence(){

    document.getElementById("sentence").innerText =
        sentences[currentIndex].chinese;

    document.getElementById("meaning").innerText =
        sentences[currentIndex].korean;

    document.getElementById("pinyin").innerText =
        pinyinVisible
        ? sentences[currentIndex].pinyin
        : "";
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

renderSentence();
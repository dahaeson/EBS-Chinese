// ==========================
// 기본 문장
// ==========================

let sentences = [

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

// ==========================
// 저장된 문장 불러오기
// ==========================

const savedSentences =
JSON.parse(
    localStorage.getItem("mySentences")
) || [];

sentences.push(...savedSentences);

// ==========================
// 상태값
// ==========================

let currentIndex = 0;
let pinyinVisible = true;

// ==========================
// 현재 문장 표시
// ==========================

function renderSentence(){

    if(sentences.length === 0){

        document.getElementById("sentence").innerText =
        "저장된 문장이 없습니다.";

        document.getElementById("pinyin").innerText = "";
        document.getElementById("meaning").innerText = "";

        return;
    }

    document.getElementById("sentence").innerText =
    sentences[currentIndex].chinese;

    document.getElementById("pinyin").innerText =
    pinyinVisible
    ? sentences[currentIndex].pinyin
    : "";

    document.getElementById("meaning").innerText =
    sentences[currentIndex].korean;
}

// ==========================
// 다음 문장
// ==========================

function nextSentence(){

    if(sentences.length === 0) return;

    currentIndex++;

    if(currentIndex >= sentences.length){
        currentIndex = 0;
    }

    renderSentence();
}

// ==========================
// 랜덤 문장
// ==========================

function randomSentence(){

    if(sentences.length === 0) return;

    currentIndex =
    Math.floor(
        Math.random() * sentences.length
    );

    renderSentence();
}

// ==========================
// 병음 숨기기
// ==========================

function togglePinyin(){

    pinyinVisible = !pinyinVisible;

    renderSentence();
}

// ==========================
// 중국어 음성
// ==========================

function speakSentence(){

    if(sentences.length === 0) return;

    const utterance =
    new SpeechSynthesisUtterance(
        sentences[currentIndex].chinese
    );

    utterance.lang = "zh-CN";

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

// ==========================
// 문장 추가
// ==========================

function addSentence(){

    const chinese =
    document
    .getElementById("newChinese")
    .value
    .trim();

    const pinyin =
    document
    .getElementById("newPinyin")
    .value
    .trim();

    const korean =
    document
    .getElementById("newKorean")
    .value
    .trim();

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

    saveCustomSentences();

    document.getElementById("newChinese").value="";
    document.getElementById("newPinyin").value="";
    document.getElementById("newKorean").value="";

    renderSentenceList();

    alert("저장 완료!");
}

// ==========================
// 저장
// ==========================

function saveCustomSentences(){

    localStorage.setItem(
        "mySentences",
        JSON.stringify(sentences)
    );
}

// ==========================
// 목록 표시
// ==========================

function renderSentenceList(){

    const list =
    document.getElementById(
        "sentenceList"
    );

    if(!list) return;

    if(sentences.length === 0){

        list.innerHTML =
        '<div class="empty">저장된 문장이 없습니다.</div>';

        return;
    }

    let html = "";

    sentences.forEach((item,index)=>{

        html += `

        <div class="list-item">

            <div class="cn">
                ${item.chinese}
            </div>

            <div class="py">
                ${item.pinyin || ""}
            </div>

            <div class="kr">
                ${item.korean || ""}
            </div>

            <button
                class="delete-btn"
                onclick="deleteSentence(${index})">

                삭제

            </button>

        </div>

        `;

    });

    list.innerHTML = html;
}

// ==========================
// 개별 삭제
// ==========================

function deleteSentence(index){

    if(
        !confirm("이 문장을 삭제할까요?")
    ){
        return;
    }

    sentences.splice(index,1);

    saveCustomSentences();

    if(currentIndex >= sentences.length){
        currentIndex = 0;
    }

    renderSentence();
    renderSentenceList();
}

// ==========================
// 전체 삭제
// ==========================

function deleteAllSentences(){

    if(
        !confirm(
            "모든 문장을 삭제할까요?"
        )
    ){
        return;
    }

    sentences = [];

    localStorage.removeItem(
        "mySentences"
    );

    currentIndex = 0;

    renderSentence();
    renderSentenceList();
}

// ==========================
// CSV 가져오기
// 형식:
// 중국어,병음,뜻
// ==========================

function importCSV(){

    const file =
    document.getElementById(
        "csvFile"
    ).files[0];

    if(!file){

        alert("CSV 파일을 선택하세요.");
        return;
    }

    const reader =
    new FileReader();

    reader.onload = function(e){

        const text =
        e.target.result;

        const rows =
        text.split("\n");

        rows.forEach(row=>{

            const cols =
            row.split(",");

            if(cols.length >= 3){

                const sentence = {

                    chinese:
                    cols[0].trim(),

                    pinyin:
                    cols[1].trim(),

                    korean:
                    cols[2].trim()

                };

                if(sentence.chinese){

                    sentences.push(
                        sentence
                    );

                }

            }

        });

        saveCustomSentences();

        renderSentenceList();

        alert(
            "CSV 업로드 완료!"
        );

    };

    reader.readAsText(
        file,
        "UTF-8"
    );
}

// ==========================
// 시작
// ==========================

renderSentence();
renderSentenceList();

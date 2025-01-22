// Захардкоженные данные глаголов
const verbs = [
  { 
    infinitive: "Ser", 
    conjugations: {
      yo: "soy", tú: "eres", él: "es", nosotros: "somos", vosotros: "sois", ellos: "son"
    }
  },
  { 
    infinitive: "Estar", 
    conjugations: {
      yo: "estoy", tú: "estás", él: "está", nosotros: "estamos", vosotros: "estáis", ellos: "están"
    }
  },
  { 
    infinitive: "Tener", 
    conjugations: {
      yo: "tengo", tú: "tienes", él: "tiene", nosotros: "tenemos", vosotros: "tenéis", ellos: "tienen"
    }
  },
  { 
    infinitive: "Hacer", 
    conjugations: {
      yo: "hago", tú: "haces", él: "hace", nosotros: "hacemos", vosotros: "hacéis", ellos: "hacen"
    }
  },
  { 
    infinitive: "Ir", 
    conjugations: {
      yo: "voy", tú: "vas", él: "va", nosotros: "vamos", vosotros: "vais", ellos: "van"
    }
  }
];

// Переменные для текущей карточки
let currentVerbIndex = 0;
let currentPronoun = "";

// Получаем случайное местоимение
const pronouns = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"];

// Генерация случайных вариантов ответа
function generateOptions(correctAnswer) {
  const options = [correctAnswer];
  while (options.length < 4) {
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    const randomPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    const wrongAnswer = randomVerb.conjugations[randomPronoun];
    if (!options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }
  return options.sort(() => Math.random() - 0.5); // Перемешиваем варианты
}

// Обновление карточки
function updateCard() {
  const verb = verbs[currentVerbIndex];
  currentPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
  const correctAnswer = verb.conjugations[currentPronoun];

  // Обновляем текст карточки
  document.getElementById("infinitive").innerText = verb.infinitive;
  document.getElementById("pronoun").innerText = currentPronoun;

  // Генерируем варианты ответа
  const options = generateOptions(correctAnswer);
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.className = "option";
    button.onclick = () => checkAnswer(button, option, correctAnswer);
    optionsContainer.appendChild(button);
  });
}

// Проверка ответа
function checkAnswer(button, selected, correct) {
  const buttons = document.querySelectorAll(".option");

  // Отключаем кнопки, чтобы нельзя было кликнуть повторно
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    // Подсвечиваем правильный ответ
    buttons.forEach(btn => {
      if (btn.innerText === correct) {
        btn.classList.add("correct");
      }
    });
  }

  // Переходим к следующей карточке через 2 секунды
  setTimeout(nextCard, 2000);
}

// Следующая карточка
function nextCard() {
  currentVerbIndex = (currentVerbIndex + 1) % verbs.length; // Переходим к следующему глаголу
  updateCard();
}

// Инициализация первой карточки
updateCard();
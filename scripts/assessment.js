// UI kit: Assessment
(function(){
  const assessmentContainer = document.querySelector('.assessment');

  const assessmentDescription = assessmentContainer.querySelector('.assessment__description');

  const positiveInput = assessmentContainer.querySelector('#positive');
  const positiveInputEmoji = assessmentContainer.querySelector('.assessment__emoji_type_positive');

  const neutralInput = assessmentContainer.querySelector('#neutral');
  const neutralInputEmoji = assessmentContainer.querySelector('.assessment__emoji_type_neutral');

  const negativeInput = assessmentContainer.querySelector('#negative');
  const negativeInputEmoji = assessmentContainer.querySelector('.assessment__emoji_type_negative');

  // Точно есть более изящный способ!
  positiveInput.addEventListener('change', () => {
    // Меняет фоновое изображение на активный смайлик
    positiveInputEmoji.classList.add('assessment__emoji_type_positive-active');

    // Удаляем фоновые изображения на остальных смайликах
    neutralInputEmoji.classList.remove('assessment__emoji_type_neutral-active');
    negativeInputEmoji.classList.remove('assessment__emoji_type_negative-active');

    //Меняем текст описания
    assessmentDescription.textContent = "Было классно!";

    //Меняем цвет описания
    assessmentDescription.classList.add('assessment__description_type_positive');
    assessmentDescription.classList.remove('assessment__description_type_neutral');
    assessmentDescription.classList.remove('assessment__description_type_negative');
  })

  neutralInput.addEventListener('change', () => {
    neutralInputEmoji.classList.add('assessment__emoji_type_neutral-active');

    positiveInputEmoji.classList.remove('assessment__emoji_type_positive-active');
    negativeInputEmoji.classList.remove('assessment__emoji_type_negative-active');

    assessmentDescription.textContent = "Нормально";

    assessmentDescription.classList.remove('assessment__description_type_positive');
    assessmentDescription.classList.add('assessment__description_type_neutral');
    assessmentDescription.classList.remove('assessment__description_type_negative');
  })

  negativeInput.addEventListener('change', () => {
    negativeInputEmoji.classList.add('assessment__emoji_type_negative-active');

    positiveInputEmoji.classList.remove('assessment__emoji_type_positive-active');
    neutralInputEmoji.classList.remove('assessment__emoji_type_neutral-active');

    assessmentDescription.textContent = "Что-то пошло не так";

    assessmentDescription.classList.remove('assessment__description_type_positive');
    assessmentDescription.classList.remove('assessment__description_type_neutral');
    assessmentDescription.classList.add('assessment__description_type_negative');
  })
})();
// /Assessment

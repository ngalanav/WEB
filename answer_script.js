var answers = [
    {
        title: "no Latvijas ?",
        descrption: "Tu tikko esi sācis iepazīt RTU fakultātes. Iespējams, ka vēl tikai uzsāki studijas vai esi tikai interesent. Ir laiks uzzināt vairāk!"
    },
    {
        title: "Jauniņais",
        descrption: "Tu tikko esi sācis iepazīt RTU fakultātes. Iespējams, ka vēl tikai uzsāki studijas vai esi tikai interesent. Ir laiks uzzināt vairāk!"
    },
    {
        title: "Pirmais kursa students",
        descrption: "Tu jau zini nedaudz par RTU fakultātēm, bet vēl daudz ko mācīties. Turpini izzināt un apgūt jaunās zināšanas!"
    },
    {
        title:  "Pamatkurss students",
        descrption:  "Tavas zināšanas par RTU fakultātēm jau ir pamatīgākas, bet vēl ir, kur augt. Turpini iesākto darbu!"
    },
    {
        title:  "Otrā kursa students",
        descrption:  "Tu jau pārzini RTU fakultātes daudz labāk nekā vairums. Tomēr vēl ir vieta izaugsmei. Tuvojies finiša taisnei!"
    },
    {
        title:  "Trešā kursa students",
        descrption:  "Tu zini daudz par RTU fakultātēm, un tavas zināšanas ir iespaidīgas. Vēl mazliet un tu būsi eksperts!"
    },
    {
        title:  "Prakses students",
        descrption:  "Tu jau gandrīz esi eksperts RTU fakultāšu jautājumos. Tavas zināšanas ir ļoti labas, turpini tādā pašā garā!"
    },
    {
        title:  "Absolvents",
        descrption: "Tavas zināšanas par RTU fakultātēm ir teju izcilas. Tu esi gandrīz profesionālis šajā jautājumā!"
    },
    {
        title:  "Eksperts",
        descrption: "Tu zini vairāk nekā vairums par RTU fakultātēm. Tavas zināšanas ir patiesi iespaidīgas. Tev atliek tikai pilnveidoties!"
    },
    {
        title: "Gudrinieks",
        descrption: "Tu esi īsts RTU fakultāšu speciālists. Tavas zināšanas ir gandrīz perfekti. Turpini tādā garā un būsi visgudrākais!"
    },
    {
        title: "Vietturis",
        descrption:  "Apsveicam! Tu esi īsts RTU fakultāšu eksperts. Tavas zināšanas ir nevainojamas. Tu esi īsts meistars šajā jomā!"
    }
];

function calculatePoints(){
    var coificent = parseInt(sessionStorage.getItem('correct_answers')) / parseInt(sessionStorage.getItem("total_answers"));
    var index = Math.round(coificent * 10);
    console.log(index);
    var pointDetails = answers[index]
    var userType = document.getElementById('user-type');
    var resultDescription = document.getElementById('result_description');
    userType.innerHTML = pointDetails.title;
    resultDescription.innerHTML = pointDetails.descrption;
}

document.addEventListener('DOMContentLoaded', function(){
    sessionStorage.removeItem("time");
    var correctAnswerText = document.getElementById('correct-asnwers-count');
    correctAnswerText.innerHTML = sessionStorage.getItem('correct_answers');
    calculatePoints();
}, false);
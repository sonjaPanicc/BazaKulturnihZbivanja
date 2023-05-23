const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const data = [

    {
        id: 1,
        title: `Izložba radova "Kako možeš SL..Zdravko?!"`,
        titleImg: "/images/title/img_01.jpg",
        date: "11/5/2022",
        desc: "…da se fotkaš gola i da kačiš javno?! Po prvi put u fizičkom, javnom prostoru, umetnik Zdravko Dulović predstavlja svoje radove javnosti. U našem novoosnovanom prostoru Baze Kulturnih Zbivanja, @nisamslavko nas suočava sa pitanjima koja su svojom gorčinom pokušavala da sputaju nastanak svega onoga što nam je on u svom onlajn krugu delio. Pitanja koja nisu samo pitanja, jer njihov odraz krije duboku osudu i nerazumevanje, postavljaju se ovlaš umetniku, modelima sa kojima radi, ali i njemu bliskim ljudima. Pitanje čiji je indirektni cilj izazvati nesigurnost i strah, postavlja svima nama kroz radove koje su nastajali tokom protekle dve godine s ciljem podizanja svesti o barijerama sa kojima se susreću naša tela, razmišljanja i karijere. …da radiš to? Da uživaš u tome? Da budeš voljen?",
        img: [
            "/images/past/prod1.png",
            "/images/past/prod2.png",
            "/images/past/prod3.png"
        ],
        upToVote: false,
        price: 500,
        memberPrice: 350,
    },
    {
        id: 2,
        title: "Novogodišnji Matinée",
        titleImg: "/images/title/img_02.jpg",
        date: "12/31/2022",
        desc: "A gde ćeš ti za Novu!? Ko je imao prilike da bude na Bazinim dešavanjima, zna da ćemo se postarati da provod bude nezaboravan! A kako je novogodišnji dan lud sam po sebi, red je da ga provedemo i u takvom prostoru! 🎧Za muzičkim pultom, dobro poznata domaća ekipa Kolektiv Base-a, u sastavu Dino R, Fluid Zbodi, Paragon i X-am.",
        img: [
            "/images/past/prod4.png",
            "/images/past/prod5.png",
            "/images/past/prod3.png"
        ],
        upToVote: false,
        price: 500,
        memberPrice: 350,
    },
    {
        id: 3,
        title: "Tattoo flash event",
        titleImg: "/images/title/img_03.jpg",
        date: "2/25/2023",
        desc: "Kako znaš da je pravo vreme za tetovažu? 🤨 Ne bismo rekli da postoji jedinstveni odgovor na ovo pitanje, ali ako ove subote 25.02. dođeš u Bazu, očekuje te celodnevni događaj posvećen baš ovoj mističnoj umetnosti 🫢 Fleš je dizajn tattoo umetnika, odnosno crtež koji je tvoj potencijalni novi saputnik na koži. Celu izložbu posvećujemo upravo njima i pozivamo te da pronađeš svoj idealni fleš! Kada ga pronađeš, u Live Tattoo stanici ćeš imati priliku i da ga oživiš! Nova šara na koži može baš tada i da se realizuje u posebnoj prostoriji koja će biti specijalno opremljena za ovu priliku.‼️Da ne zaboravimo, celog tog dana će fleševi imati posebnu PROMO cenu. Njih ne moraš odraditi tog dana, već dogovor o terminu prepuštamo tebi i tvom izabranom umetniku. Njihovi stilovi su jedinstveni, linije besprekorne, a stručnost apsolutna:@stefan_pinaink @snowblack.tattoo @molly_child @molly_sandra__@savasava.tattoo",
        img: [
            "/images/past/prod1.png",
            "/images/past/prod2.png",
            "/images/past/prod3.png"
        ],
        upToVote: false,
        price: 500,
        memberPrice: 350,
    },
    {
        id: 4,
        title: "Lounge Session 029",
        titleImg: "/images/title/img_04.jpg",
        date: "5/27/2023",
        desc: "Kao zaljubljenik u elektronsku muziku Viktor se putem svojih organizacija i pažljivo odabranih svetskih artista, posvetio razvoju Progressive house scene u Srbiji. U međuvremenu se zainteresovao za DJ-ing i tim putem počeo prenositi svoju muzičku kolekciju na publiku i prijatelje. Ove subote od 19h! Ulaz je na donacije ❣️ ",
        img: [],
        upToVote: false,
        price: 500,
        memberPrice: 400,
    },
    {
        id: 5,
        title: "Lounge Session 027",
        titleImg: "/images/title/img_05.jpg",
        date: "5/26/2023",
        desc: "Dee (Dijana Knežević) je počela da se bavi didžejingom 2008. godine i od tada pušta muziku širom regiona.„Ovo počinjete da radite kada zaista osetite muziku koja vas pokreće i osećate obavezu da podelite taj osećaj sa svima“, kaže Di. Karijeru je započela svirajući haus, a kasnije je počela da flertuje sa soulful, jazz house, deep house, lo-fi house, disco, UK house, garage i tehno zvucima. U njenim setovima uživala je publika nekih od najuglednijih beogradskih klubova kao što su The Tube, Mladost, Gadost, Barutana, kao i brojni drugi popularni klubovi u regionu. Takođe je nastupala na brojnim festivalima uključujući Enter Festival, Love Fest, Love Fire, Exit Festival, Amsterdam Dance Event i mnoge druge.    Vidimo se od 19h!",
        img: [],
        upToVote: false,
        price: 450,
        memberPrice: 350,
    },
    {
        id: 6,
        title: "DJ Sandro",
        titleImg: "/images/title/img_06.jpg",
        date: "7/1/2023",
        desc: "DJ Sandro je poreklom iz Biograda na moru.Sandro je odrastao na muzici 80-tih i 90-tih. Proveo je mnogo noći u brojnim popularnim klubovima kad je rave počinjao u Hrvatskoj (Aurora, Night, Ambasada Gaviolli). Slušajući imena poput John Digweed, Hernan Cattaneo, Sasha, Anthony Pappa i mnogih drugih, stvorio je svoj zvuk, svoju verziju progressive house-a koja je groovy funky i nadasve plesna.",
        img: [],
        upToVote: true,
        price: 500,
        memberPrice: 350,
    },
    {
        id: 7,
        title: "Otto von Disko",
        titleImg: "/images/title/img_07.jpg",
        date: "7/1/2023",
        desc: "Otto von Disko aka Magazine, je srpski DJ, producent i osnivač Deep Rest-a iz Novog Sada i rezident kluba Tunnel. Svoj muzički put je započeo 2008. godine i od tada je publiku dizao na noge na mnogim lokalnim i regionalnim festivalima i klubovima. Disko sebe karakteriše kao afterhour DJ-a u čijem se stilu oseća dodir senzualnog mikro hausa, kroz koji vodi publiku u jedinstvena iskustva.",
        img: [],
        upToVote: true,
        price: 500,
        memberPrice: 350,
    },
    {
        id: 8,
        title: `Izložba radova "Eye Candy"`,
        titleImg: "/images/title/img_08.jpg",
        date: "4/20/2023",
        desc: "Koncept „Eye Candy“ je četvrta samostalna izložba vizuelne umetnice Madlene Dašić, i predstavlja multimedijalno izlaganje njenog preispitivanja površnog estetskog zadovoljavanja savremene ljudske jedinke.        Autorka iz iskustva ličnog rada i perspektive u polju umetnosti, gde joj se često sudaraju avangardni i komercijalni smerovi razmišljanja, stavlja fokus na predmete, procese i vizuelne frekvence koji čine trenutno zadovoljavanje posmatraoca, i koliko taj trenutak traje. Savremeni pogledi su učinili da čulo vidi dominira u hijerarhiji prioriteta čula kada pričamo o vizuelnim umetnostima, tako je postalo najvažnije da kao autori njega najpre “zadovoljimo” pa zatim sve ostalo.    Hrana se više ne sprema da bi se jela, već slikala, garderoba se ne pravi da bi se nosila ili dodirnula, već fotografisala, muzika takodje traži svoju neku vizuelnu ulogu i prezentaciju pre samog zvuka.       Tamo gde vizuelni sadržaj treba biti propratni element koji samo obogaćuje iskustvo, postaje dominantan.",
        img: [
            "/images/past/prod1.png",
            "/images/past/prod2.png",
            "/images/past/prod3.png"
        ],
        upToVote: false,
        price: 500,
        memberPrice: 350,
    },
    {
        id: 9,
        title: "Lounge Session 024",
        titleImg: "/images/title/img_09.jpg",
        date: "4/29/2023",
        desc: "Suton, zagonetni Beogradski tehno DJ i producent koji više od jedne decenije radi pod različitim pseudonimima, pod alijasom Nicolai M. donosi raznovrsnu, veseliju i emotivniju selekciju acid-a, hausa i eklektičnih brejkova.        Njegov muzički stil je fokusiran na eklekticizam i soničnu manipulaciju kako bi u trenutku nastao jedinstven, dinamičan, pokretački zvuk koji se beskrajno menja i razvija.",
        img: [
            "/images/past/prod1.png",
            "/images/past/prod2.png",
            "/images/past/prod3.png"
        ],
        upToVote: false,
        price: 500,
        memberPrice: 350,
    },
    {
        id: 10,
        title: `Izložba radova "Emocija - žena"`,
        titleImg: "/images/title/img_10.jpg",
        date: "5/4/2023",
        desc: "Otvaranje druge po redu samostalne izložbe slika Nikolete Mihaljević. Slike su velikog formata, tehnike akril na platnu i biće izložene do 10. maja u Bazi Kulturnih Zbivanja. Nikoleta je završila Fakultet Primenjenih Umetnosti Univerziteta umetnosti u Beogradu 2008. godine. Radila je 11 godina kao grafički dizajner agencije media.com iz Beograda, a poslednje 3 godine se posvetila slikanju, pevanju, učenju, kao i radu na sebi i svojim emocijama.",
        img: [
            "/images/past/prod1.png",
            "/images/past/prod2.png",
            "/images/past/prod3.png"
        ],
        upToVote: false,
        price: 500,
        memberPrice: 350,
    },
];

const eventsData = data.map((item) => {
    const date = new Date(item.date);
    return {
        ...item,
        monthDate: {
            month: month[date.getMonth()],
            year: date.getFullYear(),
        },
    }
});

export default eventsData;

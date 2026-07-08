import { TyperacerText, TextCategory } from '../types';

export const TEXT_CATEGORIES: (TextCategory & { lang: 'mn' | 'en' })[] = [
  // Mongolian Categories
  { id: 'all_mn', name: 'Бүгд', icon: '📝', lang: 'mn' },
  { id: 'proverb_mn', name: 'Зүйр цэцэн үг', icon: '🐎', lang: 'mn' },
  { id: 'quote_mn', name: 'Ишлэлүүд', icon: '💡', lang: 'mn' },
  { id: 'modern_mn', name: 'Танин мэдэхүй', icon: '🌍', lang: 'mn' },
  { id: 'short_mn', name: 'Богино дасгал', icon: '⚡', lang: 'mn' },

  // English Categories
  { id: 'all_en', name: 'All', icon: '📝', lang: 'en' },
  { id: 'proverb_en', name: 'Proverbs', icon: '📖', lang: 'en' },
  { id: 'quote_en', name: 'Famous Quotes', icon: '💡', lang: 'en' },
  { id: 'modern_en', name: 'Facts & Tech', icon: '🌍', lang: 'en' },
  { id: 'short_en', name: 'Short Drills', icon: '⚡', lang: 'en' },
];

export const TYPERACER_TEXTS: (TyperacerText & { lang: 'mn' | 'en' })[] = [
  // ================= MONGOLIAN TEXTS =================

  // --- EASY MONGOLIAN TEXTS ---
  {
    id: 's1_mn',
    category: 'short_mn',
    title: 'Нийслэл хот',
    text: 'Монгол улсын нийслэл хот бол Улаанбаатар юм.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's2_mn',
    category: 'short_mn',
    title: 'Хөдөлмөр ба Амжилт',
    text: 'Шургуу хөдөлмөрлөсөн хүнд амжилт заавал ирнэ.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's3_mn',
    category: 'short_mn',
    title: 'Цаг хугацаа',
    text: 'Цаг хугацаа бол хэнд ч олдох хамгийн үнэтэй баялаг.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's4_mn',
    category: 'short_mn',
    title: 'Аажмаар урагшлах',
    text: 'Аажим урагшлах нь огт хөдлөхгүй зогсохоос хамаагүй дээр.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's5_mn',
    category: 'short_mn',
    title: 'Сайхан сэтгэл',
    text: 'Сайхан сэтгэл бол хэлж дуусашгүй агуу хүч мөн.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's6_mn',
    category: 'short_mn',
    title: 'Оюун ухааны дасгал',
    text: 'Ном унших нь оюун ухааныг тэтгэдэг сайхан зуршил билээ.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's11_mn',
    category: 'short_mn',
    title: 'Амьд байгаль',
    text: 'Ус бол чандмань эрдэнэ бөгөөд амьдралын эх үүсвэр мөн.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's12_mn',
    category: 'short_mn',
    title: 'Өглөөний дасгал',
    text: 'Өглөө бүр эрт босох нь бие махбодод маш тустай байдаг.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's13_mn',
    category: 'short_mn',
    title: 'Гэрэлт ирээдүй',
    text: 'Инээмсэглэл бол хүн бүрийн нүүрэнд гэрэл нэмэх шидтэй.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's14_mn',
    category: 'short_mn',
    title: 'Зорилготой амьдрал',
    text: 'Зорилготой хүн хол замыг туулж, амжилтад хүрч чаддаг.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's15_mn',
    category: 'short_mn',
    title: 'Сайхан үг',
    text: 'Сайхан үгээр бусдыг урамшуулах нь агуу тус юм.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's7_mn',
    category: 'proverb_mn',
    title: 'Үг хэллэг',
    text: 'Аяганы хариу өдөртөө, агтны хариу жилдээ.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's16_mn',
    category: 'proverb_mn',
    title: 'Урмын үг',
    text: 'Урам хугарахаар ууц хугар гэж монголчууд хэлдэг.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's17_mn',
    category: 'proverb_mn',
    title: 'Ажил хийвэл',
    text: 'Ажил хийвэл ам тосодно, залхуурвал хоосон хононо.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's8_mn',
    category: 'quote_mn',
    title: 'Эрүүл мэнд',
    text: 'Эрүүл биед саруул ухаан оршино гэж ард түмэн ярьдаг.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's19_mn',
    category: 'quote_mn',
    title: 'Мөрөөдлийн хүч',
    text: 'Хичээл зүтгэл байхад бүтэхгүй зүйл гэж үгүй билээ.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's9_mn',
    category: 'modern_mn',
    title: 'Ирээдүйн зорилго',
    text: 'Зорилготой хүн хол замыг туулж, амжилтад хүрч чаддаг.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's18_mn',
    category: 'modern_mn',
    title: 'Технологийн ач',
    text: 'Гар утас нь хүмүүсийг хооронд нь хялбар холбож байна.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's20_mn',
    category: 'modern_mn',
    title: 'Нарлаг өдөр',
    text: 'Нартай дулаахан өдөр гадаа тоглох улам сайхан байдаг.',
    difficulty: 'easy',
    lang: 'mn'
  },
  {
    id: 's10_mn',
    category: 'proverb_mn',
    title: 'Нөхөрлөл',
    text: 'Олон танилтай байснаас цөөн найдвартай найзтай байсан нь дээр.',
    difficulty: 'easy',
    lang: 'mn'
  },

  // --- MEDIUM MONGOLIAN TEXTS ---
  {
    id: 'p1_mn',
    category: 'proverb_mn',
    title: 'Эв нэгдлийн хүч',
    text: 'Эвлэвэл бүтнэ, дэмжвэл дэгжинэ. Дусал ус хуримтлагдсаар далай болдог шиг өчүүхэн эрдэм хураагдсаар мэргэн болно.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'p2_mn',
    category: 'proverb_mn',
    title: 'Тэвчээр ба Хөдөлмөр',
    text: 'Тэвчээр шийдвэрийг дагуулж, хөдөлмөр амжилтыг авчирдаг. Хурд хүчээр бус харин уйгагүй зүтгэлээр хамгийн өндөр оргилд хүрнэ.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'p3_mn',
    category: 'proverb_mn',
    title: 'Эрдэм номын ач тус',
    text: 'Сурснаа бүү март, уншсанаа бүү гээ. Эрдэм ухаан бол хэзээ ч хуучиршгүй үнэт баялаг бөгөөд хэнд ч үл булаагдах хөрөнгө мөн.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'p5_mn',
    category: 'proverb_mn',
    title: 'Төлөв даруу зан',
    text: 'Дуугүй хүний дороос дуулгатай морьтон гарна гэдэг. Төлөв даруу байж, хэлэх үгээ үргэлж бодож явах нь ухаант хүний гол шинж билээ.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'p6_mn',
    category: 'proverb_mn',
    title: 'Дусал усан тусламж',
    text: 'Далайд дусал нэмэр гэгчээр жижиг гэлтгүй тусламж бүхэн үнэ цэнтэй. Өдөр бүр хийж буй багахан зүтгэл чинь эцэстээ агуу том амжилтыг бүтээнэ.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'p7_mn',
    category: 'proverb_mn',
    title: 'Хэлэх үг',
    text: 'Үг хэлэхээсээ өмнө гурван удаа бод. Санамсаргүй хэлсэн ганц үг бусдын зүрхийг шархлуулж, насан туршийн гомдол үлдээж мэднэ.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'q3_mn',
    category: 'quote_mn',
    title: 'Харилцааны алтан дүрэм',
    text: 'Бусдыг сонсож сурна гэдэг өөрийгөө танин мэдэхүйн хамгийн чухал эхлэл юм. Зөөлөн нь хатуугаа иддэг шиг эелдэг дулаан үг ямар ч хүйтэн сэтгэлийг хайлуулна.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'q6_mn',
    category: 'quote_mn',
    title: 'Өөрийгөө ялах урлаг',
    text: 'Өөрийгөө ялсан хүн хамгийн хүчирхэг дайчин байдаг. Хүний амьдралын хамгийн том ялалт бол өөрийн дутагдал, сул талыг засаж залруулах явдал юм.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'q7_mn',
    category: 'quote_mn',
    title: 'Дотоод амар амгалан',
    text: 'Сэтгэлийн амар амгаланг гаднаас хайгаад олохгүй, зөвхөн өөрийн дотоод ертөнцөөс олно. Сэтгэлээ ариун байлгавал эргэн тойрон чинь гэрэлтэнэ.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'm1_mn',
    category: 'modern_mn',
    title: 'Монгол орны байгаль',
    text: 'Монгол нутгийн уудам тал, цэлмэг хөх тэнгэр, усан талст шиг тунгалаг нуурууд болон сүрлэг Алтайн уулс жуулчдын сэтгэлийг соронзон мэт татдаг.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'm3_mn',
    category: 'modern_mn',
    title: 'Эрүүл амьдрах хэв маяг',
    text: 'Эрүүл явах нь хамгийн том амжилт бөгөөд өдөр тутамдаа зөв хооллож, хангалттай унтаж, идэвхтэй хөдөлгөөн хийх нь урт наслахын нууц юм.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'm6_mn',
    category: 'modern_mn',
    title: 'Үлэг гүрвэлийн говь',
    text: 'Монголын говьд үлэг гүрвэлийн олон тооны ховор олдворууд олдсон түүхтэй. Баянзаг гэх газар дэлхийд анх удаа үлэг гүрвэлийн өндөг олдсоноор алдаршжээ.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'm7_mn',
    category: 'modern_mn',
    title: 'Цахим ертөнцийн холбоо',
    text: 'Интернэтийн ачаар хүмүүс дэлхийн өнцөг булан бүрээс хоорондоо хормын дотор холбогдож, шинэ мэдлэг мэдээллийг цаг алдалгүй авах боломжтой болжээ.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'm10_mn',
    category: 'modern_mn',
    title: 'Сансар огторгуй',
    text: 'Одон орон судлаачид дэлхийтэй төстэй амьдрал орших боломжтой шинэ гаригуудыг хайсаар байна. Сансар огторгуй бол нууц нь үл тайлагдах агуу уудам ертөнц юм.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'q4_mn',
    category: 'quote_mn',
    title: 'Алхам алхмаар урагшлах',
    text: 'Хүн зорилгодоо хүрэхийн тулд өдөр бүр бага багаар урагшлах хэрэгтэй. Замын дундаас шантралгүй, улам бүр хичээж зүтгэвэл ямар ч хэцүү давааг хялбархан туулж чадна.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 'm4_mn',
    category: 'modern_mn',
    title: 'Байгаль дэлхийгээ хайрлах',
    text: 'Байгаль дэлхийгээ хайрлан хамгаалах нь хүн бүрийн ариун үүрэг юм. Мод тарих, ус хэмнэх гэх мэт жижиг үйлдлүүд ч манай гаригийн ирээдүйд маш том өөрчлөлтийг авчирдаг.',
    difficulty: 'medium',
    lang: 'mn'
  },
  {
    id: 't1_mn',
    category: 'modern_mn',
    title: 'Шивэх ур чадвар',
    text: 'Компьютерийн гар дээр хурдан, зөв шивж сурах нь өнөөгийн мэдээллийн технологийн эрин үед маш чухал чадварт тооцогдох болсон.',
    difficulty: 'medium',
    lang: 'mn'
  },

  // --- HARD MONGOLIAN TEXTS ---
  {
    id: 'q1_mn',
    category: 'quote_mn',
    title: 'Оюун ухааны ундарга',
    text: 'Ном бол ертөнцийг харах цонх бөгөөд хүний оюун ухааныг тэтгэгч ундарга мөн. Ном уншдаггүй хүн нэг насаараа амьдардаг бол уншдаг хүн мянган өөр амьдралаар аялдаг.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'q2_mn',
    category: 'quote_mn',
    title: 'Амьдралын утга учир',
    text: 'Амьдрал бол уралдаан биш, харин алхам бүрээсээ аз жаргал, сургамж мэдрэх аялал билээ. Өчигдрөөс суралцаж, өнөөдрийг амьдарч, маргаашд итгэ.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'q8_mn',
    category: 'quote_mn',
    title: 'Ром хотыг нэг өдөр бариагүй',
    text: 'Агуу зүйлс нэг өдрийн дотор бүтдэггүй. Ром хотыг ганцхан өдөр бариагүй шиг таны хүсэж буй тэрхүү гайхалтай амжилт, мөрөөдөл асар их цаг хугацаа, тэвчээрийн үр дүнд бий болно.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'q9_mn',
    category: 'quote_mn',
    title: 'Өөрийнхөөрөө үнэнч байх',
    text: 'Хүн бүхэнд таалагдах гэж хичээх нь өөрийгөө алдахын эхлэл юм. Өөрийн үнэт зүйлийг хамгаалж, өөрийнхөөрөө үнэнч амьдрах нь энэ хорвоогийн хамгийн зоригтой шийдвэр билээ.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'm2_mn',
    category: 'modern_mn',
    title: 'Технологийн эрин үе',
    text: 'Орчин үед хиймэл оюун ухаан эрчимтэй хөгжиж, хүний амьдралын өдөр тутмын хэв маягийг өөрчилж байна. Энэ нь биднээс шинэ чадваруудыг шаардаж байна.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'm8_mn',
    category: 'modern_mn',
    title: 'Технологийн шинэ урсгал',
    text: 'Хиймэл оюун ухаан, дата аналитик, блокчэйн технологийн хөгжил нь ирээдүйн ажлын байрны бүтцийг эрс өөрчлөх хандлагатай байна. Иймд залуу үеийнхэн тасралтгүй суралцаж, хөрвөх чадвараа хөгжүүлэх шаардлагатай.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'm9_mn',
    category: 'modern_mn',
    title: 'Жэймс Вэбб дуран авай',
    text: 'Сансар судлалын салбарт Жэймс Вэбб дуран авай дэлхий дахинд урьд өмнө хэзээ ч харж байгаагүй алс холын галактикуудын өнгөт зургуудыг илгээж, одон орны шинжлэх ухаанд маш том хувьсгал хийлээ.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'q5_mn',
    category: 'quote_mn',
    title: 'Алдаанаас суралцах',
    text: 'Дэлхий дахинд алдартай эрдэмтэд, зохион бүтээгчид бүгд алдаанаас суралцсаар амжилтад хүрсэн байдаг. Хэрэв та өнөөдөр ямар нэг зүйлийг оролдоод бүтэлгүйтсэн бол энэ нь таныг дараагийн том амжилтад илүү ойртуулж буй хэрэг билээ!',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'm5_mn',
    category: 'modern_mn',
    title: 'Кибер аюулгүй байдал',
    text: 'Орчин үеийн кибер аюулгүй байдлын салбар нь интернэт хэрэглэгчдийг төрөл бүрийн халдлага, залилангаас хамгаалахад чиглэгддэг. Хүн бүр нууц үгээ урт, тэмдэгтүүдээс бүрдсэн (жишээлбэл: P@ssw0rd99!) байлгаж, хоёр шатлалт баталгаажуулалтыг идэвхжүүлэх хэрэгтэй.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'p4_mn',
    category: 'proverb_mn',
    title: 'Нүүдэлчин соёл',
    text: 'Монгол түмний түүх соёл, нүүдэлчин ахуйн уламжлал нь олон мянган жилийн турш байгаль эхтэйгээ уялдан зохицож ирсэн билээ. Бид энэхүү хосгүй үнэт соёлын өвийг хадгалж, хойч үедээ өвлүүлэн үлдээх нь эх оронч сэтгэлгээний тод илрэл юм.',
    difficulty: 'hard',
    lang: 'mn'
  },
  {
    id: 'p8_mn',
    category: 'proverb_mn',
    title: 'Эрдэмт хүн даруу',
    text: 'Эрдэмт хүн даруу, их мөрөн дөлгөөн гэдэг шиг жинхэнэ ухаантай, боловсролтой хүмүүс хэзээ ч өөрийгөө дөвийлгөж гайхуулдаггүй. Тэд бусдын үзэл бодлыг хүндэтгэж, үргэлж шинэ зүйлийг сурахад бэлэн байдаг.',
    difficulty: 'hard',
    lang: 'mn'
  },


  // ================= ENGLISH TEXTS =================

  // --- EASY ENGLISH TEXTS ---
  {
    id: 's1_en',
    category: 'short_en',
    title: 'Typing Classic',
    text: 'The quick brown fox jumps over the lazy dog.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's2_en',
    category: 'short_en',
    title: 'Hard Work',
    text: 'Hard work always pays off sooner or later.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's3_en',
    category: 'short_en',
    title: 'Time Resource',
    text: 'Time is the most valuable resource we have.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's4_en',
    category: 'short_en',
    title: 'Pace',
    text: 'Moving forward slowly is much better than standing still.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's5_en',
    category: 'short_en',
    title: 'Kindness',
    text: 'Kindness is a silent language that everyone understands.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's6_en',
    category: 'short_en',
    title: 'Skill Practice',
    text: 'Practice makes perfect when learning any skill.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's11_en',
    category: 'short_en',
    title: 'Planet Water',
    text: 'Water is essential for all living things on Earth.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's12_en',
    category: 'short_en',
    title: 'Night Sky',
    text: 'The stars shine brightly on a cold winter night.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's13_en',
    category: 'short_en',
    title: 'Simple Smile',
    text: 'A warm smile can make a big difference in someone\'s day.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's14_en',
    category: 'short_en',
    title: 'Quiet Ocean',
    text: 'The blue ocean waves gently touch the sandy beach.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's15_en',
    category: 'short_en',
    title: 'Daily Habits',
    text: 'Building small daily habits is the secret to success.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's7_en',
    category: 'proverb_en',
    title: 'First Step',
    text: 'A journey of a thousand miles begins with a single step.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's16_en',
    category: 'proverb_en',
    title: 'Action Talk',
    text: 'Actions speak louder than words in everything we do.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's8_en',
    category: 'quote_en',
    title: 'Self Belief',
    text: 'Believe you can and you are halfway there.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's17_en',
    category: 'quote_en',
    title: 'Life Love',
    text: 'Where there is great love, there is always life.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's9_en',
    category: 'quote_en',
    title: 'Perseverance',
    text: 'Success is not final, failure is not fatal.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's18_en',
    category: 'modern_en',
    title: 'Our Home',
    text: 'Earth is the third planet from the hot burning Sun.',
    difficulty: 'easy',
    lang: 'en'
  },
  {
    id: 's10_en',
    category: 'quote_en',
    title: 'Aiming High',
    text: 'Keep your eyes on the stars and your feet on the ground.',
    difficulty: 'easy',
    lang: 'en'
  },

  // --- MEDIUM ENGLISH TEXTS ---
  {
    id: 'p1_en',
    category: 'proverb_en',
    title: 'Power of Unity',
    text: 'United we stand, divided we fall. Just like drops of water accumulate to make an ocean, small bits of knowledge gather to form wisdom.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'p2_en',
    category: 'proverb_en',
    title: 'Patience and Labor',
    text: 'Patience leads to sound decisions, and labor brings success. We reach the highest peaks not by speed or strength alone, but by unyielding persistence.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'p3_en',
    category: 'proverb_en',
    title: 'Value of Learning',
    text: 'Do not forget what you have learned, and do not lose what you have read. Knowledge is an everlasting treasure that can never be stolen by anyone.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'p5_en',
    category: 'proverb_en',
    title: 'Boasting Limits',
    text: 'An empty vessel makes the most noise. Truly wise people do not boast about their skills; instead, they let their achievements speak for themselves.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'p6_en',
    category: 'proverb_en',
    title: 'Silver Lining',
    text: 'Every cloud has a silver lining. Even in the darkest times, there is always a ray of hope and a valuable lesson to be learned from our struggles.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'p7_en',
    category: 'proverb_en',
    title: 'Honesty and Trust',
    text: 'Honesty is the first chapter in the book of wisdom. Trust takes years to build, seconds to break, and a lifetime to repair, so guard it carefully.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'q3_en',
    category: 'quote_en',
    title: 'Rule of Communication',
    text: 'Learning to listen to others is the most critical start to self-discovery. Just as gentleness overcomes harshness, kind words can melt any cold heart.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'q6_en',
    category: 'quote_en',
    title: 'Rising From Falls',
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall. Resilience is the ultimate key to achieving greatness.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'q7_en',
    category: 'quote_en',
    title: 'Hidden Opportunities',
    text: 'In the middle of every difficulty lies opportunity. Keep looking forward, because every setback is just a setup for an even bigger comeback.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'm1_en',
    category: 'modern_en',
    title: 'Vibrant Ecosystems',
    text: 'The earth hosts incredible ecosystems, from expansive oceans and clear blue skies to towering mountains that attract explorers like magnets.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'm3_en',
    category: 'modern_en',
    title: 'Healthy Lifestyle',
    text: 'Being healthy is the ultimate success. Eating well, sleeping enough, and engaging in active physical exercise are the timeless secrets to a long life.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'm6_en',
    category: 'modern_en',
    title: 'Global Internet',
    text: 'The internet connects billions of people worldwide. It allows us to access a vast ocean of information in seconds, changing how we learn and collaborate.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'm7_en',
    category: 'modern_en',
    title: 'Renewable Power',
    text: 'Renewable energy from wind and solar power is playing a key role in fighting climate change, ensuring a cleaner and healthier future for our planet.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'm10_en',
    category: 'modern_en',
    title: 'Deep Space Mission',
    text: 'Robotic rovers are currently traversing the dusty crimson surface of Mars, seeking traces of ancient water and analyzing soil composition for future human crews.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'q4_en',
    category: 'quote_en',
    title: 'Limit of Doubts',
    text: 'The only limit to our realization of tomorrow will be our doubts of today. Let us move forward with strong and active faith as we pursue our dreams.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 'm4_en',
    category: 'modern_en',
    title: 'Programming Language',
    text: 'Coding is the language of the future. By learning how to write programs, you acquire the power to build tools that can solve real-world problems and help people around the globe.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 't1_en',
    category: 'modern_en',
    title: 'Keyboard History',
    text: 'Keyboard layout designs like QWERTY were originally made to prevent mechanical typewriter keys from jamming together. Today, touch typing lets us write at lightning-fast speeds.',
    difficulty: 'medium',
    lang: 'en'
  },
  {
    id: 't2_en',
    category: 'modern_en',
    title: 'Keyboard Typing Benefits',
    text: 'Learning to touch type without looking at the keyboard improves your productivity and helps you express your thoughts faster and more naturally.',
    difficulty: 'medium',
    lang: 'en'
  },

  // --- HARD ENGLISH TEXTS ---
  {
    id: 'q1_en',
    category: 'quote_en',
    title: 'Window to the World',
    text: 'A book is a window to see the world, nourishing the human mind. A person who does not read lives only one life, but a reader travels a thousand different lives.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'q2_en',
    category: 'quote_en',
    title: 'Meaning of Life',
    text: 'Life is not a race, but a journey of finding joy and learning from every step. Learn from yesterday, live for today, and hope for tomorrow.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'q8_en',
    category: 'quote_en',
    title: 'Infinite Space',
    text: 'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe. Understanding our limits is the first step toward true wisdom.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'q9_en',
    category: 'quote_en',
    title: 'Time Moving Forward',
    text: 'Do not watch the clock; do what it does. Keep going. The journey of self-improvement is endless, requiring consistency and dedication over many years.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'm2_en',
    category: 'modern_en',
    title: 'The AI Era',
    text: 'In modern times, artificial intelligence is rapidly developing and changing our daily lives. This digital age demands that we constantly learn new skills.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'm8_en',
    category: 'modern_en',
    title: 'Quantum Advantage',
    text: 'Quantum computing utilizes the principles of superposition and entanglement to process complex data at unprecedented speeds, which could revolutionize cybersecurity and medicine.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'm9_en',
    category: 'modern_en',
    title: 'Webb Discovery',
    text: 'The James Webb Space Telescope orbits nearly one million miles from Earth, capturing detailed infrared light from the very first stars and galaxies formed after the Big Bang.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'q5_en',
    category: 'quote_en',
    title: 'Unique Trail',
    text: 'Do not go where the path may lead, go instead where there is no path and leave a trail. Every champion was once a contender who simply refused to give up when things got extremely tough.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'm5_en',
    category: 'modern_en',
    title: 'Tech Security',
    text: 'To master cybersecurity in 2026, one must understand complex encryption algorithms, network firewalls, and multi-factor authentication (MFA) standards. Always use unique passwords like "K#9p@ss!88" to protect digital assets from potential breaches.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'p4_en',
    category: 'proverb_en',
    title: 'Cosmic Star-Stuff',
    text: 'The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself. Deep space exploration remains one of humanity\'s most ambitious endeavors as we look toward Mars and beyond.',
    difficulty: 'hard',
    lang: 'en'
  },
  {
    id: 'p8_en',
    category: 'proverb_en',
    title: 'Smooth Sea Sailors',
    text: 'A smooth sea never made a skilled sailor. Overcoming difficult obstacles, dealing with high pressure, and navigating uncertainties are the exact things that forge our character and make us strong.',
    difficulty: 'hard',
    lang: 'en'
  }
];

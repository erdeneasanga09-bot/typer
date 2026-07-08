export interface TranslationDict {
  title: string;
  subtitle: string;
  langLabel: string;
  setupVehicle: string;
  setupCategory: string;
  setupBot: string;
  setupDifficulty: string;
  diffAll: string;
  diffEasy: string;
  diffMedium: string;
  diffHard: string;
  muteSound: string;
  soundOn: string;
  bestSpeed: string;
  totalRaces: string;
  racesCount: string;
  tipsTitle: string;
  tipsText: string;
  textToType: string;
  readyToStart: string;
  hasError: string;
  noError: string;
  startBtnOverlay: string;
  wpmUnit: string;
  wordsPerMin: string;
  accuracy: string;
  correctRatio: string;
  errors: string;
  errorsUnit: string;
  errorLetters: string;
  duration: string;
  durationUnit: string;
  timeElapsed: string;
  completedTitle: string;
  completedDesc: string;
  rematch: string;
  nextRace: string;
  bannerTag: string;
  bannerTitle: string;
  bannerDesc: string;
  bannerBtn: string;
  historyTitle: string;
  historyEmptyTitle: string;
  historyEmptyDesc: string;
  clearHistory: string;
  colDate: string;
  colVehicle: string;
  colSpeed: string;
  colAccuracy: string;
  colErrors: string;
  colText: string;
  trackDistance: string;
  trackDistanceLabel: string;
  countdownPrepare: string;
  countdownStart: string;
  countdownDesc: string;
  backToSetup: string;
  raceBtn: string;
  ratingBeginner: string;
  ratingIntermediate: string;
  ratingExpert: string;
  ratingLegend: string;
  ratingMaster: string;
  newRecord: string;
  botNames: {
    easy: string;
    medium: string;
    hard: string;
    none: string;
  };
  botDescriptions: {
    easy: string;
    medium: string;
    hard: string;
    none: string;
  };
  botLabel: string;
  playerLabel: string;
  finishLabel: string;
}

export const translations: Record<'mn' | 'en', TranslationDict> = {
  mn: {
    title: 'Typeracer',
    subtitle: 'Шивэлтийн хурдны уралдаан',
    langLabel: 'Хэл',
    setupVehicle: '1. Хөлгөө сонгох',
    setupCategory: '2. Сэдэв сонгох',
    setupBot: '3. Өрсөлдөгч бот',
    setupDifficulty: '4. Бичвэрийн түвшин',
    diffAll: 'Бүгд',
    diffEasy: 'Амархан 🟢',
    diffMedium: 'Дундаж 🟡',
    diffHard: 'Хэцүү 🔴',
    muteSound: 'Дуугүй',
    soundOn: 'Дуутай',
    bestSpeed: 'Шилдэг хурд',
    totalRaces: 'Нийт уралдсан',
    racesCount: 'удаа',
    tipsTitle: '💡 Хурдан бичих зөвлөгөө',
    tipsText: 'Алдаа гаргавал даруй засаж хэвшээрэй. Нарийвчлал 95%-иас дээш байх нь урт хугацаанд хурдыг нэмэгдүүлдэг хамгийн гол түлхүүр юм.',
    textToType: 'Шивэх эх бичвэр:',
    readyToStart: 'Эхлэхэд бэлэн',
    hasError: 'Алдаатай байна',
    noError: 'Алдаагүй',
    startBtnOverlay: 'Уралдааныг эхлүүлэх',
    wpmUnit: 'WPM',
    wordsPerMin: 'минут дахь үгс',
    accuracy: 'Нарийвчлал',
    correctRatio: 'зөв шивсэн харьцаа',
    errors: 'Алдаа',
    errorsUnit: 'үсэг',
    errorLetters: 'алдаатай товшсон',
    duration: 'Хугацаа',
    durationUnit: 'сек',
    timeElapsed: 'зарцуулсан хугацаа',
    completedTitle: 'Барианд орлоо! Амжилтыг бүртгэлээ.',
    completedDesc: 'Амжилтыг бүртгэлээ.',
    rematch: 'Дахин уралдах',
    nextRace: 'Шинэ уралдаан',
    bannerTag: 'Монгол хэл дээрх шивэлт',
    bannerTitle: 'Уралдахад бэлэн үү?',
    bannerDesc: 'Өөрийн уралдах хөлөг, дасгал хийх сэдэв болон өрсөлдөгч ботын түвшнийг сонгоод хурдаа сорих уралдааныг эхлүүлээрэй.',
    bannerBtn: 'Уралдааныг эхлүүлэх',
    historyTitle: 'Сүүлийн уралдаанууд',
    historyEmptyTitle: 'ТҮҮХ БАЙХГҮЙ БАЙНА',
    historyEmptyDesc: 'Таны шивэлтийн уралдааны түүх энд хадгалагдах бөгөөд хурдны өсөлтийг харах боломжтой болно.',
    clearHistory: 'Түүх арилгах',
    colDate: 'Огноо',
    colVehicle: 'Хөлөг',
    colSpeed: 'Хурд (WPM)',
    colAccuracy: 'Нарийвчлал',
    colErrors: 'Алдаа',
    colText: 'Дасгал бичвэр',
    trackDistance: 'Зай: 100 метр',
    trackDistanceLabel: 'УРАЛДААНЫ ТОЙРОГ',
    countdownPrepare: 'БЭЛДЭЭРЭЙ!',
    countdownStart: 'УРАЛДАНА!',
    countdownDesc: 'Шивэлтийн уралдаан эхлэх гэж байна...',
    backToSetup: 'Тохиргоо руу буцах',
    raceBtn: 'Уралдах',
    ratingBeginner: 'Эхлэгч 🐢',
    ratingIntermediate: 'Дадлагажигч 🐎',
    ratingExpert: 'Хурдан 🚗',
    ratingMaster: 'Мэргэжилтэн 🚀',
    ratingLegend: 'Домогт Шонхор ⚡',
    newRecord: 'ШИНЭ РЕКОРД!',
    botNames: {
      easy: 'Эхлэгч бот',
      medium: 'Дундаж бот',
      hard: 'Мэргэжлийн бот',
      none: 'Ганцаараа',
    },
    botDescriptions: {
      easy: 'Удаан хурдтай',
      medium: 'Ердийн хурдтай',
      hard: 'Маш хурдан',
      none: 'Өөрийгөө сорих',
    },
    botLabel: 'Авто',
    playerLabel: 'Таны хөлөг',
    finishLabel: 'Бариа',
  },
  en: {
    title: 'Typeracer',
    subtitle: 'Typing Speed Challenge',
    langLabel: 'Language',
    setupVehicle: '1. Select Vehicle',
    setupCategory: '2. Select Topic',
    setupBot: '3. Bot Opponent',
    setupDifficulty: '4. Sentence Difficulty',
    diffAll: 'All',
    diffEasy: 'Easy 🟢',
    diffMedium: 'Medium 🟡',
    diffHard: 'Hard 🔴',
    muteSound: 'Muted',
    soundOn: 'Sound On',
    bestSpeed: 'Best Speed',
    totalRaces: 'Total Races',
    racesCount: 'times',
    tipsTitle: '💡 Typing Pro Tip',
    tipsText: 'If you make a mistake, correct it immediately. Keeping accuracy above 95% is the key to improving your typing speed in the long run.',
    textToType: 'Text to type:',
    readyToStart: 'Ready to start',
    hasError: 'Has mistake',
    noError: 'Perfect',
    startBtnOverlay: 'Start Race',
    wpmUnit: 'WPM',
    wordsPerMin: 'words per minute',
    accuracy: 'Accuracy',
    correctRatio: 'correct keystrokes',
    errors: 'Errors',
    errorsUnit: 'chars',
    errorLetters: 'mistyped characters',
    duration: 'Duration',
    durationUnit: 'sec',
    timeElapsed: 'seconds elapsed',
    completedTitle: 'Finished! Your score has been recorded.',
    completedDesc: 'Recorded.',
    rematch: 'Play Again',
    nextRace: 'New Race',
    bannerTag: 'English Typing Practice',
    bannerTitle: 'Ready to Race?',
    bannerDesc: 'Choose your vehicle, typing topic, and opponent difficulty to begin the speed challenge.',
    bannerBtn: 'Start Race Now',
    historyTitle: 'Recent Races',
    historyEmptyTitle: 'NO HISTORY YET',
    historyEmptyDesc: 'Your race history will be saved here so you can monitor your progress over time.',
    clearHistory: 'Clear History',
    colDate: 'Date',
    colVehicle: 'Vehicle',
    colSpeed: 'Speed (WPM)',
    colAccuracy: 'Accuracy',
    colErrors: 'Errors',
    colText: 'Text Snippet',
    trackDistance: 'Distance: 100m',
    trackDistanceLabel: 'RACING TRACK',
    countdownPrepare: 'GET READY!',
    countdownStart: 'RACE!',
    countdownDesc: 'The typing race is about to begin...',
    backToSetup: 'Back to Setup',
    raceBtn: 'Race',
    ratingBeginner: 'Beginner 🐢',
    ratingIntermediate: 'Intermediate 🐎',
    ratingExpert: 'Advanced 🚗',
    ratingMaster: 'Expert 🚀',
    ratingLegend: 'Legendary Falcon ⚡',
    newRecord: 'NEW RECORD!',
    botNames: {
      easy: 'Beginner Bot',
      medium: 'Regular Bot',
      hard: 'Pro Bot',
      none: 'Solo Run',
    },
    botDescriptions: {
      easy: 'Slow speed',
      medium: 'Normal speed',
      hard: 'Very fast',
      none: 'Practice solo',
    },
    botLabel: 'AI',
    playerLabel: 'Your Vehicle',
    finishLabel: 'Finish',
  }
};

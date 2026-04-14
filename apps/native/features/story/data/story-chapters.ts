import type { StoryChapter } from '@/types/domain';

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'ch1', number: 1, titleAr: 'العودة إلى الديار', titleEn: 'Return Home', requiredStage: 'wasteland',
    cards: [
      { textAr: 'عاد سالم إلى مدينته بعد غياب طويل، ليجدها غارقة في التلوث والنفايات.', textEn: 'Salem returned to his city after a long absence, only to find it drowning in pollution and waste.' },
      { textAr: 'الشوارع مليئة بالبلاستيك، والأشجار ذابلة، والسماء رمادية.', textEn: 'The streets were full of plastic, the trees were wilting, and the sky was gray.' },
      { textAr: '"لا بد أن أفعل شيئاً"، قال سالم لنفسه. "سأبدأ بخطوة واحدة."', textEn: '"I must do something," Salem said to himself. "I\'ll start with one step."' },
    ],
  },
  {
    id: 'ch2', number: 2, titleAr: 'بذور التغيير', titleEn: 'Seeds of Change', requiredStage: 'recovering',
    cards: [
      { textAr: 'بدأ سالم بجمع الزجاجات البلاستيكية من الشارع. لاحظ الجيران وبدأوا بالمساعدة.', textEn: 'Salem started collecting plastic bottles from the street. Neighbors noticed and began to help.' },
      { textAr: 'زرعوا أول شجرة معاً في ساحة الحي. كانت صغيرة لكنها رمز للأمل.', textEn: 'They planted their first tree together in the neighborhood square. It was small, but a symbol of hope.' },
      { textAr: 'يوماً بعد يوم، بدأت المدينة تتنفس من جديد.', textEn: 'Day by day, the city began to breathe again.' },
    ],
  },
  {
    id: 'ch3', number: 3, titleAr: 'المدينة تستيقظ', titleEn: 'The City Awakens', requiredStage: 'neutral',
    cards: [
      { textAr: 'افتتحت أول محطة لإعادة التدوير في المدينة. الناس بدأوا يفرزون نفاياتهم.', textEn: 'The city\'s first recycling station opened. People began sorting their waste.' },
      { textAr: 'المدارس بدأت تعلّم الأطفال عن البيئة. الحدائق عادت للحياة.', textEn: 'Schools started teaching children about the environment. Gardens came back to life.' },
      { textAr: 'لكن الطريق لا يزال طويلاً. هل سيستمر سالم والمجتمع؟', textEn: 'But the road is still long. Will Salem and the community keep going?' },
    ],
  },
  {
    id: 'ch4', number: 4, titleAr: 'الثورة الخضراء', titleEn: 'The Green Revolution', requiredStage: 'green',
    cards: [
      { textAr: 'ألواح شمسية على كل سطح، وتوربينات رياح تدور بأناقة.', textEn: 'Solar panels on every roof, and wind turbines spinning gracefully.' },
      { textAr: 'المدينة أصبحت نموذجاً يحتذى به. زوّار من مدن أخرى يأتون للتعلم.', textEn: 'The city became a model to follow. Visitors from other cities came to learn.' },
      { textAr: 'سالم ابتسم. "لم أكن وحدي أبداً. كلنا بنينا هذا معاً."', textEn: 'Salem smiled. "I was never alone. We all built this together."' },
    ],
  },
  {
    id: 'ch5', number: 5, titleAr: 'المدينة المثالية', titleEn: 'The Ideal City', requiredStage: 'utopia',
    cards: [
      { textAr: 'المدينة تزدهر. الهواء نقي، المياه صافية، والناس سعداء.', textEn: 'The city is thriving. The air is clean, the water is clear, and the people are happy.' },
      { textAr: 'كل شخص يعرف أن كل عمل صغير يصنع فرقاً كبيراً.', textEn: 'Everyone knows that every small action makes a big difference.' },
      { textAr: 'والقصة لم تنتهِ... لأن الحفاظ على البيئة رحلة لا تتوقف.', textEn: 'And the story hasn\'t ended... because protecting the environment is a journey that never stops.' },
      { textAr: 'شكراً لك على كل خطوة. أنت البطل الحقيقي. 🌍💚', textEn: 'Thank you for every step. You are the real hero. 🌍💚' },
    ],
  },
];

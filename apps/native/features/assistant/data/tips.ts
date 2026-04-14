export interface AssistantTip {
  id: string;
  keywords: string[];
  responseAr: string;
  responseEn: string;
}

export const ASSISTANT_TIPS: AssistantTip[] = [
  { id: 't1', keywords: ['بلاستيك', 'plastic'], responseAr: 'حاول استخدام أكياس قماشية بدلاً من البلاستيكية عند التسوق. يمكنك أيضاً رفض الأكياس البلاستيكية في المتاجر.', responseEn: 'Try using cloth bags instead of plastic ones when shopping. You can also refuse plastic bags at stores.' },
  { id: 't2', keywords: ['ماء', 'مياه', 'water'], responseAr: 'أغلق الصنبور أثناء تنظيف الأسنان. دقيقتان من الماء الجاري تهدر حوالي 10 لترات!', responseEn: 'Turn off the tap while brushing your teeth. Two minutes of running water wastes about 10 liters!' },
  { id: 't3', keywords: ['طعام', 'أكل', 'food'], responseAr: 'خطط لوجباتك الأسبوعية لتقليل هدر الطعام. يمكنك تجميد بقايا الطعام بدلاً من رميها.', responseEn: 'Plan your weekly meals to reduce food waste. You can freeze leftovers instead of throwing them away.' },
  { id: 't4', keywords: ['مواصلات', 'سيارة', 'transport', 'car', 'drive'], responseAr: 'حاول المشي أو ركوب الدراجة للمسافات القصيرة. إذا كانت المسافة بعيدة، استخدم المواصلات العامة.', responseEn: 'Try walking or cycling for short distances. For longer trips, use public transport.' },
  { id: 't5', keywords: ['طاقة', 'كهرباء', 'energy', 'electricity'], responseAr: 'أطفئ الأنوار والأجهزة عند عدم استخدامها. استخدم مصابيح LED الموفرة للطاقة.', responseEn: 'Turn off lights and devices when not in use. Use energy-efficient LED bulbs.' },
  { id: 't6', keywords: ['إعادة', 'تدوير', 'recycle', 'recycling'], responseAr: 'افصل النفايات إلى بلاستيك وورق ومعدن وزجاج. تأكد من تنظيف العبوات قبل إعادة تدويرها.', responseEn: 'Separate waste into plastic, paper, metal, and glass. Make sure to clean containers before recycling.' },
  { id: 't7', keywords: ['زجاجة', 'زجاجات', 'bottle', 'bottles'], responseAr: 'أعد استخدام الزجاجات كأوعية للنباتات أو للتخزين. يمكنك أيضاً صنع أشغال يدوية منها!', responseEn: 'Reuse bottles as plant pots or for storage. You can also make crafts from them!' },
  { id: 't8', keywords: ['شجرة', 'أشجار', 'tree', 'trees', 'plant'], responseAr: 'ازرع شجرة في حديقتك أو شارك في حملات التشجير. شجرة واحدة تمتص حوالي 22 كجم CO₂ سنوياً.', responseEn: 'Plant a tree in your garden or join tree-planting campaigns. One tree absorbs about 22 kg of CO₂ annually.' },
  { id: 't9', keywords: ['نصيحة', 'tip', 'اليوم', 'today'], responseAr: 'نصيحة اليوم: احمل معك كوباً قابلاً لإعادة الاستخدام بدلاً من الأكواب الورقية المبطنة بالبلاستيك.', responseEn: "Today's tip: Carry a reusable cup instead of plastic-lined paper cups." },
  { id: 't10', keywords: ['ملابس', 'clothes', 'fashion'], responseAr: 'تبرع بالملابس التي لا تحتاجها بدلاً من رميها. يمكنك أيضاً شراء ملابس مستعملة.', responseEn: 'Donate clothes you no longer need instead of throwing them away. You can also buy second-hand clothing.' },
];

export const DEFAULT_RESPONSE_AR = 'مرحباً! أنا خضار، مساعدك البيئي. اسألني عن إعادة التدوير، توفير الماء، تقليل البلاستيك، أو أي موضوع بيئي آخر!';
export const DEFAULT_RESPONSE_EN = "Hello! I'm Khudar, your eco assistant. Ask me about recycling, saving water, reducing plastic, or any other environmental topic!";

export function findTipByKeywords(query: string): AssistantTip | null {
  const lower = query.toLowerCase();
  for (const tip of ASSISTANT_TIPS) {
    if (tip.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return tip;
    }
  }
  return null;
}

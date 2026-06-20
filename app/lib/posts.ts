export type BlogEntry = {
  slug: string;
  title: string;
  titleCn: string;
  sub?: string;
  subCn?: string;
  excerpt: string;
  excerptCn: string;
  date: string;
  dateCn: string;
  content: string[];
  contentCn: string[];
};

export const posts: BlogEntry[] = [
  {
    slug: "siddhartha",
    title: "Siddhartha",
    titleCn: "悉达多",
    sub: "Reflections",
    subCn: "读后感",
    excerpt:
      "I finished Siddhartha in two days — it’s not long, just over 150 pages. His journey of self-discovery felt fantastical. After reading it, I felt like I had grasped something — and yet nothing at all.",
    excerptCn:
      "悉达多买回来两天读完了，页数不多，只有150多页。悉达多寻找自我的过程很奇幻，我感觉他很坚定的同时又很迷惑。我读完后，我好像悟到了些什么，好像又什么也没有。",
    date: "March 26, 2026",
    dateCn: "2026年3月26日 记",
    content: [
      "I finished Siddhartha in two days after buying it — it’s not long, just over 150 pages. Siddhartha’s journey of self-discovery felt fantastical. I felt he was both steadfast and lost at the same time, and the people and events he encountered along the way finally helped him understand what he had been searching for all along.",
      "After reading it, I felt like I had grasped something — and yet nothing at all. Perhaps, as the book says at the end, it is full of poetic and wise language that requires careful reading to yield deep insight. Maybe years from now, when I reread Siddhartha, I’ll have a completely different experience.",
      "The river still flows, and I am becoming part of it.",
      "The part that moved me most was when Siddhartha became a father himself — he clung to his son, unwilling to let him go. His son was rebellious, cold, wanting to escape, just as Siddhartha once was. He chased his son to the city, burning with pain, yet awakened by the river’s laughter. The same love, the same attachment, the same parting — repeated across generations. After his son left, Siddhartha underwent one of his deepest and most tender transformations: he began to envy those foolish, childlike ordinary people.",
    ],
    contentCn: [
      "悉达多买回来两天读完了，页数不多，只有150多页。悉达多寻找自我的过程很奇幻，我感觉他很坚定的同时又很迷惑，一路上遇到的人和事让他最后知道了他一直找寻的东西是什么。",
      "我读完后，我好像悟到了些什么，好像又什么也没有。也许就像书最后所说的，此书充满了诗性与智慧的语言，需要细细品读，才会有深刻的感悟。或许过了若干年后，我再次读悉达多会有不一样的体会吧。",
      "河水还在那里流，而我，也正在成为河流的一部分。",
      "书中最触动我的部分是当悉达多自己做了父亲，他却死死抓住儿子、不愿儿子离开自己。儿子像当年的他一样，叛逆、冷漠、想要逃走。悉达多追到城里，痛苦得像被火烧，却在河水的笑声中醒悟。同样的爱，同样的执着，同样的离别，隔了一代又重演。悉达多在儿子离开后，最深刻、最温柔的转变之一，他开始羨慕那些「愚蠢的、像孩子般的世人」。",
    ],
  },
  {
    slug: "life-and-death",
    title: "Life and Death Are Wearing Me Out",
    titleCn: "生死疲劳",
    sub: "Reflections",
    subCn: "读后感",
    excerpt:
      "I read through the first few reincarnations — human, donkey, bull, pig. But when it came to the dog, I lost the desire to continue. The characters' suffering and misery were too heavy to bear.",
    excerptCn:
      "西门闹的前几世，人、驴、牛、猪，我都看完了。但唯独看到狗这一世，我却没有了看下去的欲望。也许以后我会翻开继续看完，但至少目前是不想继续看了。",
    date: "March 25, 2026",
    dateCn: "2026年3月25日 记",
    content: [
      "I read through the first few reincarnations of Ximen Nao — human, donkey, bull, pig — all of them. But when it came to the dog's life, I lost the desire to continue reading.",
      "During the reading, I felt the characters' situations were tragic and pitiful, though there were also hateful aspects. Perhaps I'll pick it up again someday to finish, but for now, I don't want to continue.",
    ],
    contentCn: [
      "西门闹的前几世，人、驴、牛、猪，我都看完了。但唯独看到狗这一世，我却没有了看下去的欲望。因为在阅读的过程中我感受到了作品里的人物的处境悲惨和可怜，其实也有可恨的地方。",
      "也许以后我会翻开继续看完，但至少目前是不想继续看了。",
    ],
  },
];

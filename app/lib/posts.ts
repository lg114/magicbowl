export type ContentBlock = {
  type: "p" | "blockquote" | "image";
  text: string;
  alt?: string;
};

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
  content: ContentBlock[];
  contentCn: ContentBlock[];
};

const p = (text: string): ContentBlock => ({ type: "p", text });
const q = (text: string): ContentBlock => ({ type: "blockquote", text });
const img = (src: string, alt?: string): ContentBlock => ({
  type: "image",
  text: src,
  alt,
});

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
      p("I finished Siddhartha in two days after buying it — it’s not long, just over 150 pages. Siddhartha’s journey of self-discovery felt fantastical. I felt he was both steadfast and lost at the same time, and the people and events he encountered along the way finally helped him understand what he had been searching for all along."),
      p("After reading it, I felt like I had grasped something — and yet nothing at all. Perhaps, as the book says at the end, it is full of poetic and wise language that requires careful reading to yield deep insight. Maybe years from now, when I reread Siddhartha, I’ll have a completely different experience."),
      q("The river still flows, and I am becoming part of it."),
      p("The part that moved me most was when Siddhartha became a father himself — he clung to his son, unwilling to let him go. His son was rebellious, cold, wanting to escape, just as Siddhartha once was. He chased his son to the city, burning with pain, yet awakened by the river’s laughter. The same love, the same attachment, the same parting — repeated across generations. After his son left, Siddhartha underwent one of his deepest and most tender transformations: he began to envy those foolish, childlike ordinary people."),
    ],
    contentCn: [
      p("悉达多买回来两天读完了，页数不多，只有150多页。悉达多寻找自我的过程很奇幻，我感觉他很坚定的同时又很迷惑，一路上遇到的人和事让他最后知道了他一直找寻的东西是什么。"),
      p("我读完后，我好像悟到了些什么，好像又什么也没有。也许就像书最后所说的，此书充满了诗性与智慧的语言，需要细细品读，才会有深刻的感悟。或许过了若干年后，我再次读悉达多会有不一样的体会吧。"),
      q("河水还在那里流，而我，也正在成为河流的一部分。"),
      p("书中最触动我的部分是当悉达多自己做了父亲，他却死死抓住儿子、不愿儿子离开自己。儿子像当年的他一样，叛逆、冷漠、想要逃走。悉达多追到城里，痛苦得像被火烧，却在河水的笑声中醒悟。同样的爱，同样的执着，同样的离别，隔了一代又重演。悉达多在儿子离开后，最深刻、最温柔的转变之一，他开始羨慕那些「愚蠢的、像孩子般的世人」。"),
    ],
  },
  {
    slug: "life-and-death",
    title: "Life and Death Are Wearing Me Out",
    titleCn: "生死疲劳",
    sub: "Reflections",
    subCn: "读后感",
    excerpt:
      "I read through the first few reincarnations — human, donkey, bull, pig. But when it came to the dog, I lost the desire to continue. The characters’ suffering and misery were too heavy to bear.",
    excerptCn:
      "西门闹的前几世，人、驴、牛、猪，我都看完了。但唯独看到狗这一世，我却没有了看下去的欲望。也许以后我会翻开继续看完，但至少目前是不想继续看了。",
    date: "March 25, 2026",
    dateCn: "2026年3月25日 记",
    content: [
      p("I read through the first few reincarnations of Ximen Nao — human, donkey, bull, pig — all of them. But when it came to the dog’s life, I lost the desire to continue reading."),
      p("During the reading, I felt the characters’ situations were tragic and pitiful, though there were also hateful aspects. Perhaps I’ll pick it up again someday to finish, but for now, I don’t want to continue."),
    ],
    contentCn: [
      p("西门闹的前几世，人、驴、牛、猪，我都看完了。但唯独看到狗这一世，我却没有了看下去的欲望。因为在阅读的过程中我感受到了作品里的人物的处境悲惨和可怜，其实也有可恨的地方。"),
      p("也许以后我会翻开继续看完，但至少目前是不想继续看了。"),
    ],
  },
  {
    slug: "first-2d-game",
    title: "My First 2D Game",
    titleCn: "我的第一次2D游戏制作经历",
    sub: "Game Dev",
    subCn: "游戏开发",
    excerpt:
      "I've been interested in game development since college, but it wasn't until I discovered Godot that I finally made my first 2D platformer — a simple coin-collecting game that took me just a few hours.",
    excerptCn:
      "早在大学时期，我就对游戏开发产生了浓厚的兴趣，但直到遇见 Godot 这款引擎，我才终于做出了自己的第一个2D横版游戏——一个简单的捡金币游戏。",
    date: "June 23, 2026",
    dateCn: "2026年6月23日 记",
    content: [
      p("Even back in college, I was deeply interested in game development, but my major held me back from truly diving into this field."),
      p("Over the years, I watched more and more indie games win the hearts of players worldwide — not just through their unique personal style, but through their sincerity and creativity. That's when I started following the indie game scene closely."),
      p("Then I discovered Godot. I first saw it on Bilibili, where someone mentioned that Slay the Spire 2 was built with it. That success story inspired many aspiring developers to finally take the leap."),
      img("/projects/godot.png", "Godot Engine"),
      p("After digging deeper into its history, I realized this engine had been around for over a decade — from its early days as a closed-source internal tool, to open-sourcing on GitHub, from version 1.0 to the massive rewrite of 3.0. Each step opened doors for indie developers."),
      p("I believe Godot's secret lies in its design philosophy — the seamless combination of Nodes and Scenes, paired with GDScript, a scripting language built specifically for it. This small but beautiful engine proves that a great tool isn't about size, but about lowering the barrier to creation and letting creativity bloom."),
      p("After exploring the community, I realized making games could actually be this accessible. The seed of game development truly took root in my heart."),
      p("I found a beginner-friendly Godot tutorial on YouTube from Brackeys, a well-known game dev educator. Following along, I spent about three to four hours building my very first 2D platformer — a simple coin-collecting game."),
      img("/projects/video.png", "Brackeys Godot Tutorial"),
      p("It wasn't complex: just a character that could move and jump, coins to collect, and a green enemy that patrolled back and forth. But going from nothing to a running game was genuinely exciting and gave me a real sense of accomplishment."),
      img("/projects/game.png", "My first 2D game"),
      p("The tutorial itself was straightforward, but the part that cost me the most time was the scene setup. The video used an older version of Godot that had a TileMap node with a 'Layers' section in the inspector for adding background layers. In the newer version, TileMap has been deprecated and replaced by a standalone TileMapLayer node. It took me a while to figure this out — I eventually had to ask an AI for help."),
      p("Through this first game-making experience, I discovered two important things. First, the game design idea is truly crucial — a good concept makes the whole game fun and compelling. Second, animation requires a lot of experience. Right now, my biggest challenge is not knowing how to make animations, which holds back further progress."),
      p("In the future, I'll keep learning Godot in my spare time, hoping to create the games I truly envision — turning my ideas into reality, one step at a time."),
    ],
    contentCn: [
      p("其实早在大学时期，我就对游戏开发与制作产生了浓厚的兴趣，但受限于专业方向，一直未能真正接触这个领域。"),
      p("这些年来，我看到越来越多优秀的独立游戏受到广大玩家的喜爱与关注，它们不仅仅凭借独特的个人风格，更以其真诚和创意打动了无数人。于是，我便开始在小黑盒上持续关注独立游戏领域。"),
      p("直到我遇见了 Godot 这款游戏引擎。其实第一看见它是在b站上，看到有人说杀戮尖塔2 是用Godot做的。这一成功的案例，让更多一开始只敢想的开发者都开始行动起来。"),
      img("/projects/godot.png", "Godot 引擎"),
      p("在深入了解它的历史后，我才发现，这款引擎已经走过了十几个年头。从最初的闭源内部工具，到在GitHub上正式开源；从1.0版本的诞生，到3.0版本进行大规模重构并引入大量新功能……每一步都为独立开发者打开了通往游戏创作的大门，奠定了坚实的基础。"),
      p("我认为，Godot成功的关键，正是它独特的游戏设计理念——Node与Scene的完美结合，以及专为其量身打造的脚本语言 GDScript。这款小而美的引擎，用实际行动证明了：真正的优秀工具，不在于体量有多庞大，而在于能否真正降低创作门槛、提升开发者的幸福感，并让创意自由绽放。"),
      p("我在社区和小黑盒了解相关过后，发现制作游戏原来也可以这么容易！制作游戏这颗种子彻底在我心底发芽了🌱。"),
      p("我从油管上找到了相关 Godot的入门级视频，来自Brackeys，他在油管上挺出名的，专注于做游戏开发教程。跟着视频一步步操作，我花三四个钟完成了自己的第一个2D横版游戏，一个简单的2D捡金币游戏。"),
      img("/projects/video.png", "Brackeys Godot 教程"),
      p("虽然功能不多，只有角色移动、跳跃、捡金币，还有一个绿色的、只会来回移动的敌人，但从无到有做出一个能运行的游戏，真的让我挺兴奋的，挺有成就感的。"),
      img("/projects/game.png", "我的第一个2D游戏"),
      p("这个视频里的游戏制作难度我觉得算简单的，唯一让我花了多点时间的就是制作场景。因为视频里的用的版本是旧版本，而旧版本里有 TileMap 节点，我是要在检查器内部的「Layers」里添加背景层。而新版本的 TileMap 节点已经被废弃了。取而代之的是独立的TileMapLayer 节点。所以，让我找了好一会，最后实在没办法了，我才去问的大模型。"),
      p("经过这次第一次游戏制作的体验，我发现了两个很重要的问题。第一，游戏设计的idea真的非常关键。一个好的创意，能让整个游戏变得有趣且有吸引力。第二，动画制作需要大量的经验积累。目前我最头疼的就是不会做动画，以至于后续的工作都难以开展，这成了我目前难以回避的难点😄。"),
      p("在未来，我会空余时间继续学习Godot，希望能用它做出自己真正想要的游戏，一步步把心中的创意变成现实。"),
    ],
  },
];

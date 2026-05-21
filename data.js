const creaturesData = [
  {
    id: 0,
    name: '蓝鲸',
    scientificName: 'Balaenoptera musculus',
    description: '蓝鲸是地球上最大的动物，体长可达30米，体重超过150吨。它们主要以磷虾为食，每天需要消耗约4吨食物。由于过度捕捞和海洋污染，蓝鲸被列为濒危物种。',
    status: 'endangered',
    image: '海洋生物/蓝鲸.jpg'
  },
  {
    id: 1,
    name: '小丑鱼',
    scientificName: 'Amphiprioninae',
    description: '小丑鱼因电影《海底总动员》而广为人知。它们与海葵形成共生关系，海葵为它们提供保护，而小丑鱼则为海葵清理食物残渣。',
    status: 'least-concern',
    image: '海洋生物/小丑鱼.jpg'
  },
  {
    id: 2,
    name: '海龟',
    scientificName: 'Chelonioidea',
    description: '海龟已经在地球上生存了超过1亿年。它们每年要迁徙数千公里，回到出生的海滩产卵。塑料污染对海龟构成严重威胁，许多海龟会误食塑料垃圾。',
    status: 'vulnerable',
    image: '海洋生物/海龟.jpg'
  },
  {
    id: 3,
    name: '海豚',
    scientificName: 'Delphinidae',
    description: '海豚是高度智能的动物，具有复杂的社会行为和沟通能力。它们以鱼类和鱿鱼为食，常常以群体形式生活和捕猎。',
    status: 'least-concern',
    image: '海洋生物/海豚.jpg'
  },
  {
    id: 4,
    name: '章鱼',
    scientificName: 'Octopoda',
    description: '章鱼是软体动物中最聪明的一类，具有出色的问题解决能力和伪装能力。它们有8条触手，每条触手上都有数百个吸盘。',
    status: 'least-concern',
    image: '海洋生物/章鱼.jpg'
  },
  {
    id: 5,
    name: '北极熊',
    scientificName: 'Ursus maritimus',
    description: '北极熊是北极地区的标志性物种，依赖海冰捕猎海豹。随着全球变暖导致海冰融化，北极熊的生存面临严重威胁。',
    status: 'vulnerable',
    image: '海洋生物/北极熊.jpg'
  }
];

const trashTypes = [
  { emoji: '🗑️', points: 10 },
  { emoji: '🍾', points: 15 },
  { emoji: '🧴', points: 20 },
  { emoji: '🍼', points: 15 },
  { emoji: '🔌', points: 25 },
  { emoji: '🛒', points: 30 },
  { emoji: '👖', points: 10 },
  { emoji: '🥤', points: 10 },
  { emoji: '📦', points: 20 },
  { emoji: '🚭', points: 5 }
];
const getRandomList = () => {
  const list = [];
  while (list.length < 25) {
    const i = Math.floor(Math.random() * 25) + 1;
    if (!list.includes(i)) list.push(i);
  }

  return list.map(num => ({ num, isClicked: false }));
};

export default getRandomList;

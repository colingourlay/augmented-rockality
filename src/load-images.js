const dwayne = {
  name: 'dwayne',
  src: 'https://cdn.glitch.com/17c10ad9-03de-4e0f-9b46-b9dca33a90bd%2Fdwayne.png?1507628146567',
};
const eye = {
  name: 'eye',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Feye.png?1496842050045',
};
const mouth = {
  name: 'mouth',
  src: 'https://cdn.glitch.com/2539c9eb-689e-4765-addb-baf19c7b5bf2%2Fmouth.png?1496842076965',
};

const srcs = [
  dwayne,
  eye,
  mouth
];

export default function getImages() {
  return srcs.reduce((acc, img) => {
    acc[img.name] = document.createElement('img');
    acc[img.name].src = img.src;
    return acc;
  }, {});
}
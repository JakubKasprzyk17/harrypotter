export const getImage = (name: string) => {
  const imageMap: { [key: string]: any } = {
    levioso: require('../assets/images/spells/levioso.png'),
    transformation: require('../assets/images/spells/transformation.png'),
    glacius: require('../assets/images/spells/glacius.png'),
    arresto_momentum: require('../assets/images/spells/arresto-momentum.png'),
    incendio: require('../assets/images/spells/incendio.png'),
    bombarda: require('../assets/images/spells/bombarda.png'),
    expelliarmus: require('../assets/images/spells/expelliarmus.png'),
    confringo: require('../assets/images/spells/confringo.png'),
    accio: require('../assets/images/spells/accio.png'),
    depulso: require('../assets/images/spells/depulso.png'),
    descendo: require('../assets/images/spells/descendo.png'),
    flipendo: require('../assets/images/spells/flipendo.png'),
    diffindo: require('../assets/images/spells/diffindo.png'),
    imperio: require('../assets/images/spells/imperio.png'),
    avada_kedavra: require('../assets/images/spells/avada-kedavra.png'),
    crucio: require('../assets/images/spells/crucio.png'),
    Gryffindor: require('../assets/images/houses/gryffindor.png'),
    Slytherin: require('../assets/images/houses/slytherin.png'),
    Ravenclaw: require('../assets/images/houses/ravenclaw.png'),
    Hufflepuff: require('../assets/images/houses/hufflepuff.png')
  };
  return imageMap[name] || require('../assets/images/spells/levioso.png');
};

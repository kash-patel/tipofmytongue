export const queryToText = (q) => {
  switch (q) {
    case "ml":
      return "has a meaning similar to";
    case "sl":
      return "sounds like";
    case "sp":
      return "is spelled like";
    case "rel_jja":
      return "is a noun, often described as";
    case "rel_jjb":
      return "is an adjective, often used to describe";
    case "rel_syn":
      return "is synonymous with";
    case "rel_trg":
      return "is often associated with the word";
    case "rel_ant":
      return "is an antonym of";
    case "rel_spc":
      return "is a more specific word for";
    case "rel_gen":
      return "is a more general word for";
    case "rel_com":
      return "is something that includes a/an";
    case "rel_par":
      return "is something that is part of an/an";
    case "rel_bga":
      return "frequently follows the word";
    case "rel_bgb":
      return "is frequently followed by the word";
    case "rel_rhy":
      return "rhymes perfectly with the word";
    case "rel_nry":
      return "somewhat, but not perfectly, rhymes with the word";
    case "rel_hom":
      return "sounds like the word";
    case "rel_cns":
      return "has the same consonants as";
    default:
      return "???";
  }
};

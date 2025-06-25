export const colourPalettes = {
  blues: {
    colourBg: "184, 230, 254", // tw sky-200
    colourCellBorder: "116, 212, 255", // tw sky-300
    colourCellInactive: "0, 188, 255", // tw sky-400
    colourCellNeighbour: "0, 166, 244", // tw sky-500
    colourCellActive: "0, 132, 209", // tw sky-600
  },

  ocean: {
    colourBg: "207, 250, 254", // tw cyan-100
    colourCellBorder: "165, 243, 252", // tw cyan-200
    colourCellInactive: "103, 232, 249", // tw cyan-300
    colourCellNeighbour: "34, 211, 238", // tw cyan-400
    colourCellActive: "14, 165, 233", // tw cyan-500
  },

  autumn: {
    colourBg: "254, 243, 199", // tw amber-100
    colourCellBorder: "253, 230, 138", // tw amber-200
    colourCellInactive: "252, 211, 77", // tw amber-300
    colourCellNeighbour: "251, 191, 36", // tw amber-400
    colourCellActive: "245, 158, 11", // tw amber-500
  },

  forest: {
    colourBg: "220, 252, 231", // tw green-100
    colourCellBorder: "187, 247, 208", // tw green-200
    colourCellInactive: "134, 239, 172", // tw green-300
    colourCellNeighbour: "74, 222, 128", // tw green-400
    colourCellActive: "34, 197, 94", // tw green-500
  },

  purple: {
    colourBg: "237, 233, 254", // tw violet-100
    colourCellBorder: "221, 214, 254", // tw violet-200
    colourCellInactive: "196, 181, 253", // tw violet-300
    colourCellNeighbour: "167, 139, 250", // tw violet-400
    colourCellActive: "139, 92, 246", // tw violet-500
  },

  lava: {
    colourBg: "254, 226, 226", // tw red-100
    colourCellBorder: "254, 202, 202", // tw red-200
    colourCellInactive: "252, 165, 165", // tw red-300
    colourCellNeighbour: "248, 113, 113", // tw red-400
    colourCellActive: "239, 68, 68", // tw red-500
  },
};

export type ColourPalette = keyof typeof colourPalettes;

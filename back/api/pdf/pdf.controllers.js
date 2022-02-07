

module.exports = {

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @returns {{ originalname: string, filename: string }}
   */
  uploadFile: (req, res) => {
    console.log('req.file>>', req.file);
    const { originalname, filename } = req.file;

    res.status(200).json({
      originalname,
      filename,
    });
  },

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  extractText: (req, res) => {
    res.status(200).json({
      message: 'i work'
    })
  },
};
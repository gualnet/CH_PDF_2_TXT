const fs = require('fs/promises');
const pdfjs = require('pdfjs-dist/legacy/build/pdf');

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
   * @returns {{ numberOfPages: number, textArray: Array<string> }}
   */
  extractText: async (req, res) => {
    const { fileUID } = req.params;
    console.log('fileUID', fileUID);

    try {
      const file = await fs.readFile(`./uploads/${fileUID}`);

      const documentProxy = await pdfjs.getDocument(file).promise;
      console.log('documentProxy', documentProxy);

      const numberOfPages = documentProxy.numPages;
      const pagesStrings = Array.from(Array(numberOfPages), () => new Array(''));

      // loop pages to get the needed content
      for (let pageIdx = 0; pageIdx < numberOfPages; pageIdx++) {
        const pdfPage = await documentProxy.getPage(pageIdx + 1);
        // console.log('pdfPage', pdfPage);

        const pageTextContent = await pdfPage.getTextContent();
        // console.log('pageTextContent', pageTextContent);
        pageTextContent.items.map(item => {
          pagesStrings[pageIdx].push(item.str);
        })
      }

      for (let i = 0; i < pagesStrings.length; i++) {
        pagesStrings[i] = pagesStrings[i].join(' ');
        console.log(pagesStrings[i]);
      }
      console.log('---------pagesStrings', pagesStrings);

      res.status(200).json({
        numberOfPages,
        textArray: pagesStrings,
      })

    } catch (error) {
      console.error('[ERROR]', error);
      res.status(400).json({ message: error.message });
    }
  },
};
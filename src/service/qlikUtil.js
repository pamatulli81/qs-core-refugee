export default class QlikUtil {

    static getElemNumberFromText (layout, text) {
        return layout.qListObject.qDataPages[0].qMatrix.find(
            item => item[0].qText === text
          )[0].qElemNumber;
    }

    static getTextFromElemNumber(layout, value) {
        return layout.qListObject.qDataPages[0].qMatrix.find(
            // eslint-disable-next-line radix
            item => item[0].qElemNumber === value
          )[0].qText;
    }

}


export const defFieldList = {
  qInfo: {
    qId: "",
    qType: "FieldList"
  },
  qFieldListDef: {
    qShowSystem: true,
    qShowHidden: true,
    qShowSemantic: true,
    qShowSrcTables: true
  }
};

export const defKpiStats = {
  qInfo: {
    qType: "KpiStatsExpression"
  },
  statsExpression: [
    {
      qStringExpression: `num(Sum([PersonCount]), '#,##0' , '.' , ',')`
    },
    { qValueExpression: `Count(distinct [Asylum Country])` },
    { qValueExpression: `Count(distinct [Origin Country])` }
  ]
};

export const defKpiMain = {
  qInfo: {
    qType: "KpiMainExpression"
  },
  mainExpression: [
    { qStringExpression: `num(Sum([Population, total]), '#,##0' , '.' , ',')` },
    {
      qStringExpression: `num(Sum([PersonCount]), '#,##0' , '.' , ',')`
    },
    {
      qStringExpression: `Concat(distinct PersonType, ', ')`
    }
  ]
};

export const defBarChart = {
  qInfo: {
    qType: "BarChart"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["[Year]"]
        },
        qNullSuppression: true
      }
    ],
    qMeasures: [
      {
        qSortBy: {
          qSortByState: 0,
          qSortByFrequency: 0,
          qSortByNumeric: 0,
          qSortByAscii: 0,
          qSortByLoadOrder: 0,
          qSortByExpression: -1,
          qExpression: {
            qv: ""
          }
        },
        qDef: {
          qDef: `Sum({<Year={">=$(=Max(Year)-6)<=$(=Max(Year))"}>}[PersonCount])`,
          qLabel: "Person"
        }
      }
    ],
    qEffectiveInterColumnSortOrder: [1, 0],
    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 2, qHeight: 5000 }]
  }
};

export const defLineChart = (field = "[Origin Country]", value = "*") => {
  return {
    qInfo: {
      qType: "LineChart"
    },
    qHyperCubeDef: {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["[Year]"]
          },
          qNullSuppression: true
        }
      ],
      qMeasures: [
        {
          qSortBy: {
            qSortByState: 0,
            qSortByFrequency: 0,
            qSortByNumeric: 0,
            qSortByAscii: 0,
            qSortByLoadOrder: 0,
            qSortByExpression: -1,
            qExpression: {
              qv: ""
            }
          },
          qDef: {
            qDef: `Sum({<Year={"<=$(=Max(Year))"}, ${field}={"${value}"}>}[PersonCount])`,
            qLabel: "Person"
          }
        }
      ],
      qEffectiveInterColumnSortOrder: [1, 0],
      qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 2, qHeight: 5000 }],
      qSuppressZero: true
    }
  };
};

export const defPieChart = (field = "[Origin Country]", value = "*") => {
  return {
    qInfo: {
      qType: "PieChart"
    },
    qHyperCubeDef: {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["PersonType"]
          },
          qNullSuppression: true
        }
      ],
      qMeasures: [
        {
          qSortBy: {
            qSortByState: 0,
            qSortByFrequency: 0,
            qSortByNumeric: 0,
            qSortByAscii: 0,
            qSortByLoadOrder: 0,
            qSortByExpression: -1,
            qExpression: {
              qv: ""
            }
          },
          qDef: {
            qDef: `Sum([PersonCount])`,
            qLabel: "Person"
          }
        }
      ],
      qEffectiveInterColumnSortOrder: [1, 0],
      qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 2, qHeight: 5000 }],
      qSuppressZero: true
    }
  };
};


export const defSankeyChart = (refField, value = "*") => {
  const source = refField;
  const target = refField==="[Asylum Country]" ? "[Origin Country]" : "[Asylum Country]";
  return {
    qInfo: {
      qType: "SankeyChart"
    },
    qHyperCubeDef: {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: [source],
            qFieldLabels: ["Source"]
          },
          qNullSuppression: true
        },
        {
          qDef: {
            qFieldDefs: [target],
            qFieldLabels: ["Target"]
          },
          qNullSuppression: true
        }
      ],
      qMeasures: [
        {
          qSortBy: {
            qSortByState: 0,
            qSortByFrequency: 0,
            qSortByNumeric: 0,
            qSortByAscii: 0,
            qSortByLoadOrder: 0,
            qSortByExpression: -1,
            qExpression: {
              qv: ""
            }
          },
          qDef: {
            qDef: `num(Sum({<${source}={"${value}"}>}[PersonCount]),'#,##0', '.' , ',')`,
            qLabel: "Person Flow"
          }
        }
      ],
      qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 3, qHeight: 1000 }],
      qSuppressZero: true
    }
  };
};

export const defRefugeeTable = field => {
  return {
    qInfo: {
      qType: "RefugeesTable"
    },
    qHyperCubeDef: {
      qInterColumnSortOrder: [1, 2, 0],
      qDimensions: [
        {
          qDef: {
            qFieldDefs: [field]
          },
          qNullSuppression: true
        }
      ],
      qMeasures: [
        {
          qDef: {
            qDef: `num(Sum([PersonCount]), '#,##0' , '.' , ',')`,
            qLabel: "Sales",
            autoSort: false
          },
          qSortBy: {
            qSortByNumeric: -1
          }
        },
        {
          qDef: {
            qDef: `num(Sum([PersonCount])/Sum(TOTAL [PersonCount])*100,'#,##0.##' , '.' , ',')`,
            qLabel: "#Orders"
          }
        }
      ],
      qEffectiveInterColumnSortOrder: [1, 2, 0],
      qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 3, qHeight: 3333 }],
      qSuppressZero: true
    }
  };
};

export const defCurrentSelection = {
  qInfo: {
    qType: "MySelection"
  },
  qSelectionObjectDef: {}
};

export const defYearList = {
  qInfo: {
    qType: "ListYear"
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ["Year"],
      autoSort: false,
      qSortCriterias: [
        {
          qSortByNumeric: -1
        }
      ]
    },

    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 1, qHeight: 100 }]
  }
};

export const defPersonList = {
  qInfo: {
    qType: "ListPerson"
  },
  qListObjectDef: {
    qDef: { qFieldDefs: ["PersonType"] },
    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 1, qHeight: 100 }]
  }
};

export const defAsylumCountryList = {
  qInfo: {
    qType: "ListAsylumCountry"
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ["[Asylum Country]"],
      autoSort: false,
      qSortCriterias: [
        {
          qSortByAscii: 1
        }
      ]
    },
    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 1, qHeight: 500 }]
  }
};

export const defOriginCountryList = {
  qInfo: {
    qType: "ListOriginCountry"
  },
  qListObjectDef: {
    qDef: {
      qFieldDefs: ["[Origin Country]"],
      autoSort: false,
      qSortCriterias: [
        {
          qSortByAscii: 1
        }
      ]
    },
    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 1, qHeight: 500 }]
  }
};

export const defMapChart = {
  qInfo: {
    qType: 'MapChart'
  },
  qHyperCubeDef: {
    qDimensions: [{
      qDef: {
        qFieldDefs: ["[Origin Country]"],
        qFieldLabels: ["Origin Country"]
      },
      qNullSuppression: true
    },{
      qDef: {
        qFieldDefs: ["[OriginCountryPoints_Geometry]"],
        qFieldLabels: ["Origin Country GeoPoint"]
      },
      qNullSuppression: true
    },{
      qDef: {
        qFieldDefs: ["[Asylum Country]"],
        qFieldLabels: ["Asylum Country"]
      },
      qNullSuppression: true
    },{
      qDef: {
        qFieldDefs: ["[AsylumCountryPoints_Geometry]"],
        qFieldLabels: ["Asylum Country GeoPoint"]
      },
      qNullSuppression: true
    }],
    qMeasures: [{
      qDef: {
        qDef: "sum(PersonCount)",
        qLabel: "No Of Refugees"
      }
    }],
    qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 5, qHeight: 1000 }],
    qSuppressZero: true
  }
}

export const defNewsFeed = {
  qInfo: {
    qType: "NewsFeed"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["[pubYear]"]
        }
      },
      {
        qDef: {
          qFieldDefs: ["[pubDateFriendly]"]
        }
      },
      {
        qDef: {
          qFieldDefs: ["[title]"]
        }
      },
      {
        qDef: {
          qFieldDefs: ["[description]"]
        }
      },
      {
        qDef: {
          qFieldDefs: ["[link]"]
        }
      },
      {
        qDef: {
          qFieldDefs: ["[image]"]
        }
      }
    ],
    qMeasures: [
      {
        qSortBy: {
          qSortByState: 0,
          qSortByFrequency: 0,
          qSortByNumeric: 0,
          qSortByAscii: 0,
          qSortByLoadOrder: 0,
          qSortByExpression: -1,
          qExpression: {
            qv: ""
          }
        },
        qDef: {
          qDef: `Only({1}pubDate)`,
          qLabel: "Published Date"
        }
      }
    ],
    qEffectiveInterColumnSortOrder: [0, 1],
    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 7, qHeight: 1200 }]
  }
};

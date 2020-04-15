// full ZingChart schema can be found here:
// https://www.zingchart.com/docs/api/json-configuration/
// Chart Data

d3.csv("final_chicago_data.csv", function (data) {

  data.forEach(function (parse) {
    parse.primary_type = +parse.primary_type;
    parse.month = +parse.month;
    // parse.year = +parse.year;
    parse.latitude = +parse.latitude
    parse.longitude = +parse.longitude
  });

  console.log(data[1]);
  var domestic_20 = []
  var non_domestic_20 = []
  var domestic_19 = []
  var non_domestic_19 = []

  for (var i = 0; i < data.length; i++) {
    if (data[i].domestic === "True" && data[i].year === '2020') {
      domestic_20.push(data[i].primary_type)
    }
    else if (data[i].domestic === "False" && data[i].year === '2020'){
      non_domestic_20.push(data[i].primary_type)
    }
    else if (data[i].domestic === "True" && data[i].year === '2019'){
      domestic_19.push(data[i].primary_type)
    }
    else {
      non_domestic_19.push(data[i].primary_type)
    }
  }

  console.log(domestic_20)
  console.log(non_domestic_20)
  console.log(domestic_19)
  console.log(non_domestic_19)



  // let domestic = [3, 3, 4, 6, 4, 3, 3, 5, 6, 7, 9, 10];
  // let non_domestic = [3, 3, 4, 7, 4, 3, 3, 7, 8, 9, 11, 12];
  // let subpoenas = [3, 3, 4, 6, 4, 3, 3, 9, 10, 12, 13, 14];
  // let usRequests = [3, 3, 4, 6, 4, 3, 3, 10, 11, 13, 14, 15];
  // let governmentRequests = [3, 3, 4, 6, 4, 3, 3, 11, 12, 14, 15, 16];

  // Chart Configuration
  let chartConfig = {
    type: 'area',
    globals: {
      fontFamily: 'Poppins',
      fontColor: '#333'
    },
    title: {
      text: 'Comparison between Domestic and Non-domestic crimes',
      align: 'center',
      padding: '5px'
    },
    subtitle: {
      text:
        '',
      align: 'center',
      fontColor: '#505050',
      padding: '10px'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: '3x2',
      border: 'none',
      item: {
        fontSize: '18px'
      },
      marker: {
        type: 'circle'
      }
    },
    tooltip: {
      callout: true,
      text: '%t:<br>%v Requests received between<br>Jan 2020 & April 2020',
      backgroundColor: '#F7F9FA',
      fontColor: '#505050',
      fontSize: '18px',
      padding: '20px 35px',
      borderRadius: '4px'
    },
    plot: {
      aspect: 'spline'
    },
    scaleX: {
      values: '0:3:1',
      transform: {
        type: "date",
        all: "%m.%d.%Y",
      },
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
      ]
    },
    scaleY: {
      values: '0:17500:250'
    },
    series: [
      {
        values: domestic_20,
        text: 'Domestic 2020',
        zIndex: 3,
        alphaArea: 1,
        lineColor: '#ffffff',
        lineWidth: '1.5px',
        backgroundColor: '#62E9D8',
        marker: {
          size: '0px'
        },
        hoverMarker: {
          size: '10px',
          backgroundColor: '#fff',
          borderColor: '#eee'
        }
      },
      {
        values: non_domestic_20,
        text: 'Non-Domestic 2020',
        zIndex: 1,
        alphaArea: 1,
        lineColor: '#ffffff',
        backgroundColor: '#70DE99',
        marker: {
          size: '0px'
        },
        hoverMarker: {
          size: '10px',
          backgroundColor: '#fff',
          borderColor: '#eee'
        }
      },
    {
      values: domestic_19,
      text: 'Domestic 2019',
      zIndex: 2,
      alphaArea: 1,
      lineColor: '#ffffff',
      backgroundColor: '#B2DC93',
      marker: {
        size: '0px'
      },
      hoverMarker: {
        size: '10px',
        backgroundColor: '#fff',
        borderColor: '#eee'
      }
    },
    {
      values: non_domestic_19,
      text: 'Non-Domestic 2019',
      zIndex: 0,
      alphaArea: 1,
      lineColor: '#ffffff',
      backgroundColor: '#FFE295',
      marker: {
        size: '0px'
      },
      hoverMarker: {
        size: '10px',
        backgroundColor: '#fff',
        borderColor: '#eee'
      }
    }
  ]
    // {
    //   values: governmentRequests,
    //   text: 'Government Requests',
    //   zIndex: 6,
    //   alphaArea: 1,
    //   lineColor: '#ffffff',
    //   backgroundColor: '#FF9C85',
    //   marker: {
    //     size: '0px'
    //   },
    //   hoverMarker: {
    //     size: '10px',
    //     backgroundColor: '#fff',
    //     borderColor: '#eee'
    //   }

  };

  // Render Method
  zingchart.render({
    id: 'myChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
  });
});
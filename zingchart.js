// full ZingChart schema can be found here:
// https://www.zingchart.com/docs/api/json-configuration/
// Chart Data

d3.csv("chicago_data.csv", function (data) {

  data.forEach(function (parse) {
    // parse.day = +parse.day;
    // parse.month = +parse.month;
    // parse.year = +parse.year;
    parse.latitude = +parse.latitude
    parse.longitude = +parse.longitude
  });

  console.log(data[1]);
  var domestic = []
  var non_domestic = []
  for (var i = 0; i < data.length; i++) {
    if (data[i].domestic === "True") {
      domestic.push(data[i].date)
    }
    else {
      non_domestic.push(data[i].date)
    }
  }

  console.log(domestic)
  console.log(non_domestic)


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
      text: '%t:<br>%v Requests received between<br>Jan 2019 & April 2020',
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
      values: '0:100:2'
    },
    series: [
      {
        values: domestic,
        text: 'Domestic',
        zIndex: 8,
        alphaArea: 1,
        lineColor: '#ffffff',
        lineWidth: '3px',
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
        values: non_domestic,
        text: 'Non-Domestic',
        zIndex: 9,
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
      }
    ]
    // {
    //   values: subpoenas,
    //   text: 'Subpoenas',
    //   zIndex: 8,
    //   alphaArea: 1,
    //   lineColor: '#ffffff',
    //   backgroundColor: '#B2DC93',
    //   marker: {
    //     size: '0px'
    //   },
    //   hoverMarker: {
    //     size: '10px',
    //     backgroundColor: '#fff',
    //     borderColor: '#eee'
    //   }
    // },
    // {
    //   values: usRequests,
    //   text: 'US Requests',
    //   zIndex: 7,
    //   alphaArea: 1,
    //   lineColor: '#ffffff',
    //   backgroundColor: '#FFE295',
    //   marker: {
    //     size: '0px'
    //   },
    //   hoverMarker: {
    //     size: '10px',
    //     backgroundColor: '#fff',
    //     borderColor: '#eee'
    //   }
    // },
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
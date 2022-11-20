import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

function History({ transactions }) {
  const [period, setPeriod] = useState([]);
  const [values, setValues] = useState([]);

  let formatCurrency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });

  const getTransactionsAmounts = () => {
    const result = period.map((date) =>
      transactions
        .filter(
          (item: any) =>
            moment(item.createdAt).format("DD/MM/YYYY") ===
            moment(date).format("DD/MM/YYYY")
        )
        .reduce((acc, item) => acc + item.value, 0)
    );

    return result;
  };

  const getLastDays = () => {
    let date = moment().format();

    let listOfDates = [];

    for (let i = 0; i < 7; i++) {
      listOfDates.push(date);
      date = moment(date).subtract(1, "days").format();
    }

    return listOfDates;
  };

  useEffect(() => {
    const listOfDates = getLastDays();
    const resultValues = getTransactionsAmounts();
    setPeriod(listOfDates);
    setValues(resultValues);
  }, [transactions]);

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return formatCurrency.format(val);
        },
        style: {
          fontSize: "12px",
        },
      },
      xaxis: {
        type: "datetime" as "datetime",
        categories: period,
        color: "white",
      },
      fill: {
        colors: ["#ff0084"],
      },
      title: {
        text: "Movimentações dos últimos 7 dias",
        style: {
          color: "white",
        },
      },
    },

    series: [
      {
        name: "saldo",
        data: values,
      },
    ],
  };

  return (
    <div>
      <div className="bg-black-900 p-4 rounded-bl-2xl rounded-br-2xl">
        <ApexCharts
          options={state.options}
          series={state.series}
          type="bar"
          width="100%"
          height="200px"
        />
      </div>
    </div>
  );
}

export { History };

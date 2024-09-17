import React from "react";
import { Pie } from "@ant-design/charts";

interface ProductCategoryChartProps {
  data: { category: string; value: number }[];
}

const ProductCategoryChart: React.FC<ProductCategoryChartProps> = ({
  data,
}) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "category",
    radius: 1,
    innerRadius: 0.6,
    label: {
      offset: "-50%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
    legend: {
      position: "bottom",
    },
    tooltip: {
      showTitle: false,
      formatter: (datum: any) => ({
        name: datum.category || "Unknown Category",
        value: datum.value || 0,
      }),
    },
  };

  return <Pie {...config} />;
};

export default ProductCategoryChart;

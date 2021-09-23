import React from "react";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

const CategoriesTabs = (props: any) => {
  return (
    <Tabs
      defaultActiveKey={props.defaultActiveKey}
      onChange={props.onChange}
      {...props}
    >
      <TabPane tab={<h3>All</h3>} key="All">
        {props.categoryContents}
      </TabPane>
      {props.allCategoriesContents}
    </Tabs>
  );
};

export default CategoriesTabs;

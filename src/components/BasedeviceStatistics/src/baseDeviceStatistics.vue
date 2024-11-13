<template>
    <div style="
        display: flex;
        justify-content: space-between;
        gap: 0 16px;
        margin-bottom: 15px;
        max-height: 150px;
        min-height: 95px;
        /* height: 125px; */
      ">
      <div v-for="item in renderList" :key="item.key" style="
          /* width: 250px; */
          flex: 1;
  
          /* height: 110px; */
          min-width: 150px;
          border-radius: 8px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        ">
        <img :src="item.bg" alt="" style="
            width: 100%;
            height: 100%;
            min-width: 130px;
            transform: scale(1.2);
          " />
        <div style="
            color: white;
            font-size: 14px;
            left: 16px;
            top: 16px;
            position: absolute;
          ">
          {{ item.text }}
        </div>
        <div style="
            color: white;
            font-size: 32px;
            left: 15px;
            bottom: 16px;
            position: absolute;
            font-weight: 600;
          ">
          {{ item.value }}
  
          <span style="font-size: 16px; font-weight: normal">{{
            item.unit
          }}</span>
        </div>
        <img :src="item.icon" alt="" style="position: absolute; right: 16px; z-index: 999; top: 16px" />
      </div>
    </div>
  </template>
  <script setup>
  // 引入目前支持的背景图片和右上角图标
  import group1 from "../../../assets/img/Group1.png";
  import group2 from "../../../assets/img/Group2.png";
  import group3 from "../../../assets/img/Group3.png";
  import baseDeviceList from "../../../assets/img/basedevice-list.png";
  import baseDeviceNonactivated from "../../../assets/img/basedevice-nonactivated.png";
  import baseDeviceActivate from "../../../assets/img/basedevice-activate.png";
  import baseDeviceOnline from "../../../assets/img/basedevice-online.png";
  import labNumSum from "../../../assets/img/labSum.svg";
  import labNumBiology from "../../../assets/img/biology.svg";
  import labNumChemistry from "../../../assets/img/chemistry.svg";
  import labNumPhysics from "../../../assets/img/physics.svg";
  import {
    ref,
    reactive,
    onBeforeMount,
    watch,
    computed,
    defineProps,
  } from "vue";
  // 因为有些模块并不知按照固定的4个卡片展示的，所以改成了通过外部传入数据进行渲染，同时渲染样式通过内部defaultConfig进行控制
  // 如果存在其他样式只需要修改或者扩充defaultConfig即可
  // 默认支持的7种统计卡片
  const defaultConfig = ref({
    deviceNumTotal: {
      key: "deviceNumTotal",
      bg: group1,
      icon: baseDeviceList,
      text: "设备数量",
      unit: "台",
    },
    deviceNumActive: {
      key: "deviceNumActive",
      bg: group2,
      icon: baseDeviceActivate,
      text: "已激活设备",
      unit: "台",
    },
    deviceNumUnActive: {
      key: "deviceNumUnActive",
      bg: group1,
      icon: baseDeviceNonactivated,
      text: "未激活设备",
      unit: "台",
    },
    deviceNumOnline: {
      key: "deviceNumOnline",
      bg: group3,
      icon: baseDeviceOnline,
      text: "在线设备",
      unit: "台",
    },
    violationNum: {
      key: "violationNum",
      bg: group1,
      icon: baseDeviceList,
      text: "违规数",
      unit: "个",
    },
    complianceNum: {
      key: "complianceNum",
      bg: group2,
      icon: baseDeviceList,
      text: "合规数",
      unit: "个",
    },
    traffic: {
      key: "traffic",
      bg: group3,
      icon: baseDeviceList,
      text: "人流量",
      unit: "人",
    },
    labSum: {
      key: "labSum",
      bg: group1,
      icon: labNumSum,
      text: "实验室总量",
      unit: "间",
    },
    chemistryLab: {
      key: "chemistryLab",
      bg: group2,
      icon: labNumChemistry,
      text: "化学实验室",
      unit: "间",
    },
    physicsLab: {
      key: "physicsLab",
      bg: group3,
      icon: labNumPhysics,
      text: "物理实验室",
      unit: "间",
    },
    biologyLab: {
      key: "biologyLab",
      bg: group2,
      icon: labNumBiology,
      text: "生物实验室",
      unit: "间",
    },
  });
  // messval: 传入的统计数据的key和value
  const props = defineProps(["messval"]); //获取父组件传递的数据
  
  // 试剂渲染卡片的数据
  const renderList = computed({
    get: () => {
      const list = Object.keys(props.messval ? props.messval : {})
        .filter((key) => defaultConfig.value[key]) // 过滤一下，如果传入了defaultConfig之外的key不渲染
        .map((item) => {
          return {
            // 配置信息取defaultConfig中匹配到的值，value取传入对应key的value
            ...defaultConfig.value[item],
            value: props.messval[item],
          };
        });
      return list;
    },
  });
  </script>
  
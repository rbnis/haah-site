import React from 'react';
import { Switch, Form, SwitchProps, Slider, SliderSingleProps } from 'antd';
import { HuePicker, HuePickerProps } from 'react-color';

export function LabeledSwitch<T>({label, ...rest}: {label: string} & SwitchProps) {
  return (
    <Form.Item label={label} labelCol={{ span: 20 }} wrapperCol={{ span: 4 }} labelAlign='left'>
      <Switch {...rest}/>
    </Form.Item>
  )
}

export function LabeledSlider<T>({label, ...rest}: {label: string} & SliderSingleProps) {
  return (
    <Form.Item label={label} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} labelAlign='left'>
      <Slider {...rest}/>
    </Form.Item>
  )
}

export function Label<T>({label, value}: {label: string, value: string}) {
  return (
    <Form.Item label={label} labelCol={{ span: 18 }} wrapperCol={{ span: 6 }} labelAlign='left'>
      <span style={{float: 'right'}} className="ant-form-text">{value}</span>
    </Form.Item>
  )
}

export function LabeledColorPicker<T>({label, ...rest}: {label: string} & HuePickerProps) {
  return (
    <Form.Item label={label} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} labelAlign='left'>
      <HuePicker width={"auto"} {...rest} />
    </Form.Item>
  )
}

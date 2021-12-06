import { Switch, Form, SwitchProps, Slider, SliderSingleProps } from 'antd';
import React from 'react';

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

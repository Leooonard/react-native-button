# onPress系列事件总结

## 4个事件
在Touchable系列组件中，都支持4种事件，分别是：

1. onPress
2. onPressIn
3. onPressOut
4. onLongPress

## 场景

#### 场景1
**动作：**快速按下，放开，不动手指。

**结论：**只出现```onPress```。

#### 场景2
**动作：**按下保持很短一段时间，放开，不动手指。

**结论：**出现```onPressIn，onPressOut，onPress```。

#### 场景3
**动作：**按下保持较长一段时间，放开，不动手指。

**结论：**出现```onPressIn，onLongPress，onPressOut```。

#### 场景4
**动作：**快速按下后，移动手指，直接移出元素，放开手指。

**结论：**出现```onPressIn，onPressOut```。

#### 场景5
**动作：**快速按下后，移动手指，但是不移出元素，放开手指。

**结论：**出现```onPressIn，onPressOut，onPress```。

#### 场景6
**动作：**快速按下后，移动手指，移出元素，移回元素，反复数次，在元素内放开手指。

**结论：**出现```onPressIn，onPressOut，。。。onPressIn，onPressOut，onPress```。

#### 场景7
**动作：**快速按下后，移动手指，移出元素，移回元素，反复数次，在元素外放开手指。

**结论：**出现```onPressIn，onPressOut，。。。onPressIn，onPressOut```。

#### 场景8
**动作：**按下保持较长一段时间，移动手指，移出元素，移回元素，反复数次。

**结论：**出现```onPressIn，onLongPress，onPressOut，onPressIn。。。onPressIn，onPressOut```。

## 分析

#### 分析1
onPress与onLongPress无法同时出现。

#### 分析2
onPressIn与onPressOut一定成对出现。

### 分析3
当不出现onLongPress且最后触摸在元素内时，会触发onPress。（哪怕在过程中曾经移出过元素范围）

#### 分析4
onPressIn与onPressOut并不一定出现。（这是与web不同的地方，onPressIn，onPressOut与web的monsedown，mouseup不同。移出元素会触发onPressOut就是证明。但是在触摸不移出元素且自身出现时，其表现与mousedown，mouseup相同）。

#### 分析5
border是元素的一部分。

## 总结

#### 总结1
检测长按事件的方法是直接监听onLongPress事件。

#### 总结2
检测点击事件的方法是直接监听onPress事件。如果需求是移出元素后放开手指也算一次点击事件，则比较困难，因为难以确认点击事件的结束，需要再想想怎么做。

#### 总结3
对于拖动相关，应该使用PanResponder。

#### 总结4
仅使用这4种事件，难以处理细致到mousedown，mouseup级别的事件。但是对于按钮的点击事件已经足够。
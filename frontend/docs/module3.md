---
sidebar_position: 4
title: "Module 3: Simulation & Digital Twins"
---

# Module 3: Simulation & Digital Twins

:::danger **Cost of Failure**
Testing code directly on a $100,000 Humanoid Robot is dangerous. One math error can destroy the hardware. We **always** simulate first.
:::

## 3.1 The Concept of the Digital Twin

A **Digital Twin** is a virtual replica of your physical robot. It must obey the laws of physics (Gravity, Friction, Collision).

**Leading Simulators:**
1.  **Gazebo (Classic/Ignition):** The open-source standard. Great integration with ROS.
2.  **NVIDIA Isaac Sim:** Photorealistic, GPU-accelerated. Used for training Visual AI models.
3.  **MuJoCo:** Excellent for contact physics and Reinforcement Learning.

## 3.2 URDF: Describing the Robot

To simulate a robot, we must describe it using **URDF (Unified Robot Description Format)**, which is an XML structure.

### Anatomy of a URDF
A robot is a tree of **Links** (rigid bodies) connected by **Joints** (movable axis).

```xml
<robot name="simple_arm">
  <!-- Base Link -->
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.6" radius="0.2"/>
      </geometry>
    </visual>
  </link>

  <!-- Moving Arm Link -->
  <link name="arm_1">
    <visual>
      <geometry>
        <box size="0.1 0.1 0.5"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.1 0.1 0.5"/>
      </geometry>
    </collision>
  </link>

  <!-- Joint Connecting Them -->
  <joint name="shoulder_joint" type="revolute">
    <parent link="base_link"/>
    <child link="arm_1"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1.0"/>
  </joint>
</robot>
```

## 3.3 Sim-to-Real Transfer

The biggest challenge in Physical AI is the **Sim-to-Real Gap**.
*   *Simulation:* Perfect friction, no sensor noise, unlimited battery.
*   *Reality:* Slippery floors, noisy cameras, motor heat.

**Techniques to bridge the gap:**
1.  **Domain Randomization:** During training, randomize the color of floors, the lighting, and the friction in the simulator. This forces the AI to learn robust features.
2.  **System Identification:** Tuning the simulator parameters (mass, damping) to match the real physical robot exactly.

## 3.4 Project: Gazebo "Hello World"

In this module's lab, you will launch a simple differential drive robot in a Gazebo warehouse environment.

```bash
# Launching a simulation (Example Command)
ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
```

## Summary

Simulation is not just a debugging tool; it is a **Data Generator**. Modern AI robots learn to walk in simulation (millions of steps) before they take their first step in the real world.
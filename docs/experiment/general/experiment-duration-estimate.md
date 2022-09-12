---
title: Experiment Duration Estimate
description: Understand how experiment duration estimate is calculated
---

!!! info
    This is only for the primary metric and sequential testing right now. This is not supported in Experiment Results.

Given the current statistics (control/treatment mean, control/treatment variance, and control/treatment exposures), Amplitude forecasts expected behavior in the future, and calculates how many days it will take to reach statistical significance. If any of these statistics change significantly, the estimate will be off. If there are multiple variants the max of the estimates is taken. As Amplitude receives more data, the prediction will become better over time. 

## FAQ

### 1. Why is the duration estimate not showing?

The duration estimate only shows up when the follow criteria is met:

1. All the statistics assumptions are met
    1. The absolute lift is outside the confidence interval
    2. The confidence interval is flipped (lower confidence interval > upper confidence interval)
    3. The standard error is very small
    4. Variance is negative
    5. Conversion rate > 1 or < 0 (if applicable)
2. The metric has already reached statistical significance
3. The end date of the analysis window is in the past
4. There are enough observations. We use the [same condition](https://help.amplitude.com/hc/en-us/articles/4403176829709-How-Amplitude-Experiment-uses-sequential-testing-for-statistical-inference#why-don%E2%80%99t-i-see-any-confidence-interval-on-the-confidence-interv) as for the starting to compute the confidence interval. 
5. The experiment has been rolled out or rolled back

### 2. What does worst case, average case, and best case mean?

The time until a hypothesis test reaches statistical significance is a random variable. We use the worst case, average case, and best case to indicate the uncertainty in our estimate. 

* Best case estimate of 3 days: 20% of the time, the experiment will reach stat sig in <= 3 days
* Average case estimate of 7 days: 50% of the time the experiment will reach stat sig in <= 7 days
* Worst case estimate of 10 days: 80% of the time the experiment will reach stat sig in <=10 days.

### 3. Is there a cap for the duration estimate that we calculate?

There is currently a 40 day cap for the following reasons:

1. Computational/latency reasons. We do real time simulations and don't want to add lots of latency. Also, there are theoretical edge cases where the simulations may never terminate.
2. Assuming that the means/standard deviations won't change over time is not the greatest assumption to make especially for long running experiments.
3. It is easier to predict things in the short term than in the long term. For example, it is easier to predict and be correct if it will rain tomorrow than predict and be correct if it will rain 2 months from now.
4. Generally you should run experiments less than 40 days and knowing that the experiment is going to day 40+ days vs. 60 days probably isn't that much more helpful for a customer.

### 4. How does Amplitude determine the number of exposures per day?

We assumed that the cumulative exposures is a straight line (i.e. we take the cumulative exposures today and divide by the length of the experiment so far to get how many exposures per day. 

## Types of Errors

### 1. Irreducible Error

This is an error we can do nothing about. It is not something where if we spend more time we can decrease this error. Say you are trying to predict if a fair coin is heads. No matter what algorithm you use you cannot be correct more than 50% of the time. There is just randomness that you cannot account for. If you want to move to the continuous version, say you are drawing a number from a standard normal distribution. Your best guess is 0. Then 32% of the time you will be off by >= 1 of the true value. Another way of stating this is that the mean squared error is 1. There is no way to get a smaller mean squared error. Now relating this to experiment duration. The time it takes for an experiment to reach stat sig is a random variable because it depends on the p-value and the p-value depends on data. Even if we cheat and say we know the control mean, control standard deviation, treatment mean, treatment standard deviation, and we force everything to be normally distributed exactly and independence and all the stats assumptions we want to make, we still cannot get 0 error. When we run simulations, we can see that each simulation will reach stat sig at different times. This is the whole reason why we need to run multiple simulations. If each simulation returned the same number, then we would only need to do 1 simulation. This is just how randomness works. If you want to map this to t-test, the p-value is a random variable and that is the reason why we need to have power and say the probability of the p-value < .05 (i.e. we are asking what is the probability of a probability).

### 2. Estimates being wrong

We estimate the control population mean, control population standard deviation, etc with the sample estimates. There is error here also. If we could estimate the control population mean with no error there would be no point in doing experimentation. The estimates we are using are optimal, so there is not much improvement we can do here.

### 3. Drift

If there is any drift in any of the statistics we will do poorly. By drift I mean today the control mean = 5 and ten days from now the control mean = 15. This includes things like seasonality. We are already making this assumption of no drift when doing hypothesis testing, so it is not like we are adding an extra assumption.

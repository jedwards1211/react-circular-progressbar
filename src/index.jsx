import React from 'react';
import PropTypes from 'prop-types';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;

class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    };
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  getPathDescription() {
    const radius = this.getRadius();
    return `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;
  }

  getProgressStyle() {
    const diameter = Math.PI * 2 * this.getRadius();
    const truncatedPercentage = Math.min(Math.max(this.state.percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
    return {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - truncatedPercentage) / 100 * diameter)}px`,
    };
  }

  getRadius() {
    return (50 - this.props.strokeWidth / 2);
  }

  render() {
    const {classes, percentage, textForPercentage, className, strokeWidth} = this.props;
    const classForPercentage = this.props.classForPercentage ? this.props.classForPercentage(percentage) : '';
    const pathDescription = this.getPathDescription();
    
    const text = textForPercentage ? textForPercentage(percentage) : null;

    return (
      <svg
        className={`${classes.root} ${className} ${classForPercentage}`}
        viewBox="0 0 100 100"
      >
        <path
          className={classes.trail}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
        />

        <path
          className={classes.path}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          style={this.getProgressStyle()}
        />

        {text ? <text
          className={classes.text}
          x={50}
          y={50}
        >
          {text}
        </text> : null}
      </svg>
    );
  }
}

CircularProgressbar.propTypes = {
  percentage: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  classes: PropTypes.object,
  initialAnimation: PropTypes.bool,
  classForPercentage: PropTypes.func,
  textForPercentage: PropTypes.func,
};

CircularProgressbar.defaultProps = {
  strokeWidth: 8,
  className: '',
  classes: {
    root: 'CircularProgressbar',
    trail: 'CircularProgressbar-trail',
    path: 'CircularProgressbar-path',
    text: 'CircularProgressbar-text',
  },
  initialAnimation: false,
  textForPercentage: (percentage) => `${percentage}%`,
};

export default CircularProgressbar;

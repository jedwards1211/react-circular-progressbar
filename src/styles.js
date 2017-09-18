/*
 * react-circular-progressbar styles
 *
 * All of the styles in this file are optional and configurable!
 */

module.exports = {
  root: {
    /*
     * This fixes an issue where the CircularProgressbar svg has
     * 0 width inside a "display: flex" container, and thus not visible.
     *
     * If you're not using "display: flex", you can remove this style.
     */
    width: '100%',
  },
  path: {
    stroke: '#3e98c7',
    strokeLinecap: 'round',
    transition: 'stroke-dashoffset 0.5s ease 0s',
  },
  trail: {
    stroke: '#d6d6d6',
  },
  text: {
    fill: '#3e98c7',
    fontSize: 20,
    dominantBaseline: 'middle',
    textAnchor: 'middle',
  },
}


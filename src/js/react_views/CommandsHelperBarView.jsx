var React = require('react');
var PropTypes = require('prop-types');
var HelperBarView = require('../react_views/HelperBarView.jsx');
var Main = require('../app');
var GlobalStateStore = require('../stores/GlobalStateStore');

var log = require('../log');
var intl = require('../intl');

class CommandsHelperBarView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isSolvingExercise: GlobalStateStore.getIsSolvingExercise()
    };
    this.onGlobalStateChange = this.onGlobalStateChange.bind(this);
  }

  componentDidMount() {
    GlobalStateStore.subscribe(this.onGlobalStateChange);
  }

  componentWillUnmount() {
    GlobalStateStore.unsubscribe(this.onGlobalStateChange);
  }

  render() {
    return (
      <HelperBarView
        items={this.getItems()}
        shown={this.props.shown}
      />
    );
  }

  fireCommand(command) {
    log.viewInteracted('commandHelperBar');
    Main.getEventBaton().trigger('commandSubmitted', command);
  }

  onGlobalStateChange() {
    this.setState({
      isSolvingExercise: GlobalStateStore.getIsSolvingExercise()
    });
  }

  getItems() {
    var items = [{
      text: intl.str('command-helper-bar-levels'),
      onClick: function() {
        this.fireCommand('levels');
      }.bind(this),
    }];

    if (!this.state.isSolvingExercise) {
      items.push({
        text: intl.str('command-helper-bar-solution'),
        onClick: function() {
          this.fireCommand('show solution');
        }.bind(this),
      });
    }

    return items.concat([{
      text: intl.str('command-helper-bar-reset'),
      onClick: function() {
        this.fireCommand('reset');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-undo'),
      onClick: function() {
        this.fireCommand('undo');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-objective'),
      onClick: function() {
        this.fireCommand('objective');
      }.bind(this),
    }, {
      text: intl.str('command-helper-bar-help'),
      onClick: function() {
        this.fireCommand('help general; git help');
      }.bind(this)
    }, {
      icon: 'fa-solid fa-right-from-bracket',
      onClick: function() {
        this.props.onExit();
      }.bind(this)
    }]);
  }

};

CommandsHelperBarView.propTypes = {
  shown: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired
};

module.exports = CommandsHelperBarView;

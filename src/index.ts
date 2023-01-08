import './analytics';
import * as events from './events';
import * as views from './views';

views.initializeGenerators();
views.renderCounter();
views.renderCursor();
views.renderGenerators();

events.addButtonListener();
events.addCursorListener();
events.addGeneratorListeners();

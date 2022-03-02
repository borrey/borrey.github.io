/* global exports module define */
/**
 * Functional pattern matching for JavaScript.
 */
(function () {
    "use strict";

    var matchPattern = function (pattern, arg)
    {
        if (typeof pattern === 'function')
        {
            return pattern.call(this, arg);
        }
        else if (pattern instanceof RegExp)
        {
            return pattern.test(arg);
        }
        else if (pattern instanceof Array)
        {
            return matchArray.call(this, pattern, arg);
        }
        else if (pattern !== null && typeof pattern === 'object')
        {
            return matchObject.call(this, pattern, arg);
        }
        else
        {
            return pattern === arg;
        }
    };
    var matchArray = function (pattern, arg)
    {
        if (!(arg instanceof Array))
        {
            return false;
        }
        if (arg.length !== pattern.length)
        {
            return false;
        }
        for (var i in pattern)
        {
            if (!matchPattern.call(this, pattern[i], arg[i]))
            {
                return false;
            }
        }
        // FIXME: allow grabbing rest of array
        return true;
    };
    var matchObject = function (pattern, arg)
    {
        if (arg === null || typeof arg !== 'object')
        {
            return false;
        }
        for (var k in pattern)
        {
            if (!(k in arg))
            {
                return false;
            }
            if (!matchPattern.call(this, pattern[k], arg[k]))
            {
                return false;
            }
        }
        return true;
    };
    var strictMatchHelper = function (pattern)
    {
        return function (arg)
        {
            return pattern === arg;
        };
    };
    var matchArrayHelper = function (pattern)
    {
        return function (arg)
        {
            return matchArray.call(this, pattern, arg);
        };
    };
    var matchObjectHelper = function (pattern)
    {
        return function (arg)
        {
            return matchObject.call(this, pattern, arg);
        };
    };
    var patternToFunc = function (pattern)
    {
        if (typeof pattern === 'function')
        {
            return pattern;
        }
        else if (pattern instanceof RegExp)
        {
            return pattern.test.bind(pattern);
        }
        else if (pattern instanceof Array)
        {
            return matchArrayHelper(pattern);
        }
        else if (pattern !== null && typeof pattern === 'object')
        {
            return matchObjectHelper(pattern);
        }
        else
        {
            return strictMatchHelper(pattern);
        }
    };

    var P = function (name, pattern)
    {
        if (arguments.length === 2)
        {
            var matchFunc = patternToFunc(pattern);
            return function (arg)
            {
                if (name in this && this[name] !== arg)
                {
                    return false;
                }
                this[name] = arg;
                return matchFunc.call(this, arg);
            };
        }
        else
        {
            return function (arg)
            {
                if (name in this && this[name] !== arg)
                {
                    return false;
                }
                this[name] = arg;
                return true;
            };
        }
    };
    P.Function = function (options)
    {
        options = options || {};
        var patterns = this._patterns = [];
        this._fallback = undefined;
        var scope = this;
        this.end = function ()
        {
            var captures;
            for (var i = 0; i < patterns.length; i++)
            {
                captures = {};
                var matches = patterns[i].matches;
                if (options.strict_arg_length ? arguments.length !== matches.length : arguments.length < matches.length)
                {
                    continue;
                }
                var nomatch = false;
                for (var j = 0; j < matches.length; j++)
                {
                    if (!matches[j].call(captures, arguments[j]))
                    {
                        nomatch = true;
                        break;
                    }
                }
                if (nomatch)
                {
                    continue;
                }
                captures.arguments = Array.prototype.slice.call(arguments);
                return patterns[i].action.call(this, captures);
            }
            if (scope._fallback)
            {
                captures = {};
                captures.arguments = Array.prototype.slice.call(arguments);
                return scope._fallback.call(this, captures);
            }
            else
            {
                throw new Error('no pattern matched arguments');
            }
        };
    };
    P.Function.prototype.when = function ()
    {
        var matches = [];

        for (var i = 0; i < arguments.length - 1; i++)
        {
            matches.push(patternToFunc(arguments[i]));
        }

        var pattern = {
            matches: matches,
            action: arguments[arguments.length - 1]
        };
        this._patterns.push(pattern);
        return this;
    };
    P.Function.prototype.otherwise = function (action)
    {
        this._fallback = action;
        return this;
    };
    P._ = function ()
    {
        return true;
    };
    P.matches = function (pattern, arg)
    {
        var captures = {};
        if (matchPattern.call(captures, pattern, arg))
        {
            return captures;
        }
        else
        {
            return false;
        }
    };
    P.hasType = function (type)
    {
        return function (x)
        {
            return typeof x === type;
        };
    };
    P.isA = P.isAn = function (type, pattern)
    {
        if (pattern !== null && typeof pattern === "object")
        {
            return function (x)
            {
                return x instanceof type && matchObject.call(this, pattern, x);
            };
        }
        else
        {
            return function (x)
            {
                return x instanceof type;
            };
        }
    };
    P.captureRE = function (re)
    {
        var captures = Array.prototype.slice.call(arguments);
        return function (x)
        {
            var result = re.exec(x);
            if (result === null)
            {
                return false;
            }
            for (var i = 1; i < captures.length; i++)
            {
                this[captures[i]] = result[i];
            }
            return true;
        };
    };

    P.with = function ()
    {
        var args = Array.prototype.slice.call(arguments);
        var captures;
        var scope = {
            when: function () {
                if ('value' in scope)
                {   // already have a result, so skip
                    return scope;
                }
                if (arguments.length - 1 !== args.length)
                {
                    return scope;
                }
                for (var i = 0; i < args.length - 1; i++)
                {
                    captures = {};
                    if (!matchPattern.call(captures, arguments[i], args[i]))
                    {
                        return scope;
                    }
                }
                captures.arguments = args;
                scope.value = arguments[arguments.length - 1];
                return scope;
            },
            otherwise: function (value) {
                if ('value' in scope)
                {
                    scope.value = value;
                    captures = {
                        'arguments': args
                    };
                }
                return scope;
            },
            exec: function (self) {
                if ('value' in scope)
                {
                    throw new Error('no pattern matched arguments');
                }
                else
                {
                    return scope.value.call(self, captures);
                }
            }
        };
        return scope;
    };

    P.Match = function () {
        this.matches = [];
        for (var i = 0; i < arguments.length; i++)
        {
            this.matches.push(patternToFunc(arguments[i]));
        }
    };
    P.Match.prototype.exec = function () {
        var captures = {};
        if (arguments.length !== this.matches.length)
        {
            return false;
        }
        for (var i = 0; i < this.matches.length; i++)
        {
            if (!this.matches[i].call(captures, arguments[i]))
            {
                return false;
            }
        }
        captures.arguments = Array.prototype.slice.call(arguments);
        return captures;
    };
    P.Match.prototype.test = function () {
        var captures = {};
        if (arguments.length !== this.matches.length)
        {
            return false;
        }
        for (var i = 0; i < this.matches.length; i++)
        {
            if (!this.matches[i].call(captures, arguments[i]))
            {
                return false;
            }
        }
        return true;
    };

    // export module depending on what kind of environment we are in
    if (typeof exports === 'object' && typeof module !== 'undefined' && module.exports) {
        // commonjs (e.g. NodeJS)
        module.exports = P;
    } else if (typeof this.define === 'function' && this.define.amd) {
        // AMD (e.g. requirejs)
        this.define('Pjs', function () {
            return P;
        });
    }
    else
    {
        // browser
        this.Pjs = P;
    }
}.call(this));
